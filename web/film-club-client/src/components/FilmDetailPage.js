import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Grommet, Heading, Image, ResponsiveContext, Text } from 'grommet';

import defaultMoviePoster from '../static/default-movie-poster.png';

import Header from './Header';

const FilmDetailPage = () => {
  const [movieDetails, setMovieDetails] = useState({});
  // const [showVideo, setShowVideo] = useState(false);

  // React Router URL Parameter object
  const { id } = useParams();

  // Add breakpoints to the Grommet theme for ResponsiveContext screen size
  const customBreakpoints = {
    global: {
      breakpoints: {
        xsmall: {
          value: 375,
        },
        small: {
          value: 568,
          edgeSize: {
            none: '0px',
            small: '6px',
            medium: '12px',
            large: '24px',
          },
        },
        medium: {
          value: 768,
          edgeSize: {
            none: '0px',
            small: '12px',
            medium: '24px',
            large: '48px',
          },
        },
        large: {
          value: 1024,
          edgeSize: {
            none: '0px',
            small: '12px',
            medium: '24px',
            large: '48px',
          },
        },
        xlarge: {
          value: 1366,
          edgeSize: {
            none: '0px',
            small: '12px',
            medium: '24px',
            large: '48px',
          },
        },
      },
    },
  };

  // // Fetch all movie details with {id} from params, on {id} assignment by React Router
  useEffect(() => {
    // Use the {id} to fetch details about the corresponding movie
    const getMovieDetails = async (id) => {
      const response = await fetch(`/films/${id}`);
      const data = await response.json();
      console.log(data);
      setMovieDetails(data);
    };
    getMovieDetails(id);
  }, [id]);

  // Deconstruct 'movieDetails' object
  let {
    backdropPath,
    credits,
    images,
    genres,
    overview,
    posterPath,
    releaseDate,
    status,
    tagline,
    title,
    videos,
  } = movieDetails;

  // Format Release Date for UX
  let formattedReleaseDate;
  if (releaseDate) {
    // Set as JS Date object
    formattedReleaseDate = new Date(releaseDate);
    // Offset user timezone difference
    formattedReleaseDate = new Date(
      formattedReleaseDate.setMinutes(
        formattedReleaseDate.getMinutes() +
          formattedReleaseDate.getTimezoneOffset()
      )
    );
    // Format release date display to "MM.DD.YY"
    const day = formattedReleaseDate.getDate();
    const month = formattedReleaseDate.getMonth() + 1;
    const year = formattedReleaseDate
      .getFullYear()
      .toString()
      .split('')
      .slice(2)
      .join('');
    formattedReleaseDate = `${month}.${day}.${year}`;
  }

  // const size = useContext()
  // console.log(size)

  // Check if movieDetail object has poster image
  if (images) {
    // if it does - use the poster image path for fetch
    // If it doesnt - use the default poster image
    let posterUrl = posterPath
      ? `/films/images/poster${posterPath}?size=small`
      : defaultMoviePoster;

    let bannerImage = backdropPath
      ? `/films/images/backdrop${backdropPath}?size=large`
      : 'https://wallpaperaccess.com/full/1679629.jpg';

    //  If the movieDetails payload has a videos object, filter for the official trailer
    let movieTrailer = videos.filter(
      (video) => video.type === 'Trailer' || 'Teaser'
    )[0];

    // Select top level crew members for display
    let crewArray = [];
    if (credits.crew[0]) {
      credits.crew.forEach((member) => {
        if (
          member.job === 'Screenplay' ||
          member.job === 'Director' ||
          member.job === 'Novel'
        ) {
          crewArray.push(member);
        }
      });
    }

    let responsiveDirection;

    return (
      <Grommet theme={customBreakpoints} full>
        <ResponsiveContext.Consumer>
          {(size) => {
            size === 'xsmall'
              ? (responsiveDirection = 'column')
              : (responsiveDirection = 'row');
            return (
              <Box
                className="page-box"
                direction="column"
                justify="around"
                background="dark-1"
                overflow={{
                  vertical: 'scroll',
                }}
                pad={{ vertical: '4em' }}
              >
                <Header />

                <Box className="banner-box" width="100%">
                  <Box className="banner-content-box" justify="center">
                    <Box
                      className="backdrop-banner"
                      background={{
                        image: `url(${bannerImage})`,
                        size: 'cover',
                      }}
                      align="center"
                    >
                      <Box
                        className="gradient-layer-box"
                        align="center"
                        width="100%"
                        background={{ color: 'dark-1', opacity: 'medium' }}
                      >
                        <Box
                          className="banner-text-layer"
                          width={{ max: '80%' }}
                          pad="large"
                          align="center"
                          responsive='true'
                        >
                          <Text
                            size="4em"
                            weight="800"
                            margin={{ top: '0', bottom: 'small' }}
                            
                          >
                            {title}
                          </Text>

                          {tagline && (
                            <Box className="text-header-group">
                              <Text
                                size="1.5em"
                                weight="700"
                                margin={{ top: 'xsmall', bottom: 'medium' }}
                              >
                                <em>{tagline}</em>
                              </Text>
                            </Box>
                          )}
                          {overview && (
                            <Box className="text-header-group" width="large">
                              <Text
                                size="1.1em"
                                weight="600"
                                margin={{ top: 'xsmall' }}
                              >
                                {overview}
                              </Text>
                            </Box>
                          )}
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>

                <Box className="main-container-for-centering" align="center">
                  <Box
                    className="main-container-flex"
                    direction={responsiveDirection}
                    justify="center"
                    align="center"
                    background="#333333"
                    width={{ max: '90%', min: '85%' }}
                    margin={{top: "5%"}}
                    responsive={true}
                  >
                    <Box
                      className="poster-info-box"
                      direction="column"
                      justify="around"
                      align="center"
                      width={{ max: '375px', min: '375px'}}
                    >
                      <Box className="poster-box" margin={{ bottom: '1em' }}>
                        <Box>
                          <Image
                            src={posterUrl}
                            alt={`${title} poster image`}
                          />
                        </Box>
                      </Box>

                      <Box className="info-box">
                        <Box className="all-text-box" text-align="start">
                          <Box className="sub-text-box" pad="small">
                            <Box className="inner-sub-text-box">
                              <Box
                                className="text-header-group"
                                direction="row"
                                margin={{ bottom: 'xsmall' }}
                              >
                                <Text
                                  size="0.9em"
                                  weight="bold"
                                  margin={{ right: 'xsmall' }}
                                >
                                  RELEASE DATE
                                </Text>
                                <Text size="0.9em">{formattedReleaseDate}</Text>
                              </Box>
                              <Box
                                className="text-header-group"
                                direction="row"
                                margin={{ bottom: 'xsmall' }}
                              >
                                <Text
                                  size="0.9em"
                                  weight="bold"
                                  margin={{ right: 'xsmall' }}
                                >
                                  GENRES
                                </Text>
                                <Box direction="column">
                                  {genres[0] &&
                                    genres.map((genre, id) => (
                                      <Text key={id} size="0.9em">
                                        {genre.name}
                                      </Text>
                                    ))}
                                </Box>
                              </Box>
                              <Box
                                className="text-header-group"
                                direction="row"
                              >
                                <Text
                                  size="0.9em"
                                  weight="bold"
                                  margin={{ right: 'xsmall' }}
                                >
                                  STATUS
                                </Text>
                                <Box direction="column">
                                  {status && <Text size="0.9em">{status}</Text>}
                                </Box>
                              </Box>
                            </Box>
                            <Box>
                              <Box
                                className="inner-sub-text-box-crew"
                                direction="row"
                                wrap={true}
                                align="start"
                                margin={{ top: 'medium' }}
                                justify="between"
                              >
                                {crewArray.map((crew, id) => (
                                  <Box key={id} margin={{ right: 'small' }}>
                                    <Text size="0.9em" weight="bold">
                                      {crew.job}
                                    </Text>
                                    <Text size="0.9em">{crew.name}</Text>
                                  </Box>
                                ))}
                              </Box>
                            </Box>
                            
                          </Box>
                        </Box>
                      </Box>
                    </Box>

                    {videos[0] ? (
                      <Box justify="center" align="center" width="100%">
                          {size === 'small' ? (
                            <iframe
                              title={movieTrailer.name}
                              src={movieTrailer.url}
                              height="175px"
                              width="349px"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            ></iframe>
                          ) : (
                            <iframe
                              title={movieTrailer.name}
                              src={movieTrailer.url}
                              height="450px"
                              width="750px"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            ></iframe>
                          )}
                      </Box>
                    ) : (
                      <Box
                        direction="column"
                        justify="center"
                        align="center"
                        pad="small"
                        margin={{ top: 'xlarge' }}
                        round="small"
                        responsive={true}
                      >
                        <Text size="1.25em" margin="small" color="light-3">
                          No trailer for this film yet, check back soon!
                        </Text>
                      </Box>
                    )}

                    <Box className="hero-box" direction="row" justify="around">
                      <Box
                        className="info-box-wrapper"
                        direction="column"
                        justify="start"
                      >
                        <Box
                          className="info-box"
                          direction="column"
                          justify="start"
                          height="16em"
                        ></Box>
                      </Box>
                    </Box>

                    <Box className="media-box">
                    </Box>
                  </Box>
                </Box>
              </Box>
            );
          }}
        </ResponsiveContext.Consumer>
      </Grommet>
    );
  } else {
    return (
      <Box justify="center" direction="row" gap="small" pad="small">
        <Text alignSelf="center">Loading...</Text>
      </Box>
    );
  }
};

export default FilmDetailPage;
