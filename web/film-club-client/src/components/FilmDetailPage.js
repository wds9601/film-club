import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Image, Heading, Paragraph, Text } from 'grommet'; 

import defaultMoviePoster from '../static/default-movie-poster.png';

import Header from './Header';

const FilmDetailPage = () => {
  const [movieDetails, setMovieDetails] = useState({});
  const [showVideo, setShowVideo] = useState(false);

  // React Router URL Parameter object
  const { id } = useParams();

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

  if (images) {
    // Check if movieDetail object has poster image:
    // if it does - use the poster image path for fetch
    // If it doesnt - use the default poster image
    let posterUrl = posterPath
      ? `/films/images/poster${posterPath}?size=medium`
      : defaultMoviePoster;

    //  If the movieDetails payload has a videos object, filter for the official trailer
    let movieTrailer = videos.filter((video) => video.type === 'Trailer')[0];

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
      // console.log(crewArray);
    }

    return (
      <Box
        className="page-box"
        direction="column"
        justify="around"
        background="dark-2"
        overflow={{
          vertical: 'scroll',
        }}
        pad={{ vertical: '4em', horizontal: 'large' }}
      >
        <Header />

        {videos[0] ? (
          <Box
            width="100%"
            round="small"
            border={{ color: 'accent-4', size: 'small' }}
            overflow="hidden"
          >
            <iframe
              title={movieTrailer.name}
              width="100%"
              height="300"
              src={`https://www.youtube.com/embed/${movieTrailer.key}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </Box>
        ) : (
          <Box
            direction="column"
            justify="center"
            align="center"
            pad="small"
            margin={{ top: 'xlarge' }}
            round="small"
            border={{ color: 'accent-4', size: 'small' }}
            responsive={true}
          >
            <Text size="1.25em" margin="small" color="light-3">
              No trailer for this film yet, check back soon!
            </Text>
          </Box>
        )}

        <Box
          className="poster-info-box"
          direction="column"
          justify="around"
          align="center"
          pad="medium"
          round="small"
          border={{ color: 'accent-4', size: 'small' }}
          margin={{ top: 'large' }}
        >
          <Box className="poster-box" margin={{ bottom: '1em' }}>
            <Box>
              <Image src={posterUrl} alt={`${title} poster image`} />
            </Box>
          </Box>

          <Box className="info-box">
            <Box className="all-text-box" text-align="start">
              <Text size="2.75em" weight="bold">
                {title}
              </Text>

              <Box className="sub-text-box" pad="small">
                <Box className="inner-sub-text-box">
                  <Box
                    className="text-header-group"
                    direction="row"
                    align="center"
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
                    align="start"
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
                    align="start"
                  >
                    <Text
                      size="0.9em"
                      weight="bold"
                      margin={{ right: 'xsmall' }}
                    >
                      STATUS
                    </Text>
                    <Box direction="column">
                      {status && (
                        <Text size="0.9em">
                          {status}
                        </Text>
                      )}
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
                <br />
                <Box className="info-text-box" direction="column">
                  {tagline && (
                    <Box className="text-header-group">
                      <Text
                        size="0.9em"
                        margin={{ top: 'xsmall', bottom: 'medium' }}
                      >
                        <em>{tagline}</em>
                      </Text>
                    </Box>
                  )}
                  {overview && (
                    <Box className="text-header-group">
                      <Text size="0.9em" margin={{ top: 'xsmall' }}>
                        {overview}
                      </Text>
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box className="hero-box" direction="row" justify="around">
          <Box className="info-box-wrapper" direction="column" justify="start">
            <Box
              className="info-box"
              direction="column"
              justify="start"
              height="16em"
            ></Box>
          </Box>
        </Box>

        <Box className="media-box">
          {backdropPath && (
            <Box className="images-box">
              <Image
                src={`/films/images/backdrop${backdropPath}?size=small`}
                alt={`${title} backdrop image`}
              />
            </Box>
          )}
          {videos[0] && <Box className="videos-box"></Box>}
        </Box>
      </Box>
    );
  } else {
    return <Heading level="2">Loading...</Heading>;
  }
};

export default FilmDetailPage;
