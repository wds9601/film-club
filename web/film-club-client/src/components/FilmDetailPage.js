import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Image, Heading, Layer, Text } from 'grommet';
import { CirclePlay } from 'grommet-icons';

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
    images,
    genres,
    releaseDate,
    tagline,
		title,
		posterPath,
    overview,
    videos,
	} = movieDetails;


  if (images) {

		// Check if movieDetail object has poster image, if it does use the poster image path for fetch
		// If it doesnt, use the default poster image
		// if ()
		// let posterPath = images.posters[0].file_path ? images.posters[0];
		let posterUrl = posterPath
			? `/films/images/posters${posterPath}?size=large`
			: defaultMoviePoster;
		
		//  If the movieDetails payload has a videos object, filter for the official trailer
		let movieTrailer = videos.filter(video => video.type === 'Trailer')[0];

    return (
      <Box
        className="page-box"
        display="flex"
        direction="column"
        justify="around"
        background="dark-2"
        height={{ min: '100vh' }}
        overflow={{
          vertical: 'scroll',
        }}
        pad="medium"
      >
        <Header />
        <Box
          className="hero-box"
          display="flex"
          direction="row"
          justify="around"
          margin={{ top: '4em' }}
        >
          <Box
            className="poster-box"
            pad={{ right: 'medium' }}
            width={{ min: '5em' }}
          >
            <Box>
              <Image
                src={posterUrl}
                alt={`${title} poster image`}
              />
            </Box>
            <Box
              className="trailer-box"
              display="flex"
              direction="row"
              justify="around"
              onClick={() => setShowVideo(true)}
              focusIndicator={false}
              margin={{ top: 'small' }}
              pad="small"
              border={{ size: 'small', color: 'accent-4' }}
              round="small"
            >
              <Text>Watch Trailer</Text>
              <CirclePlay size="25em" color="accent-4" />
            </Box>
            {showVideo && (
              <Layer
                modal={true}
                responsive={true}
                onEsc={() => setShowVideo(false)}
                onClickOutside={() => setShowVideo(false)}
                round="medium"
              >
                {videos[0]  ? (
                  <iframe
                    title={movieTrailer.name}
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${movieTrailer.key}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <Box
                    display="flex"
                    direction="column"
                    justify="center"
                    align="center"
                    pad="small"
                    responsive={true}
                  >
                    <Text size="1.25em" margin="small" color="light-3">
                      No trailer for this film yet, check back soon!
                    </Text>
                    <Box
                      border={{ size: 'small', color: 'accent-4' }}
                      color="accent-4"
                      alignSelf="center"
                      pad={{ horizontal: 'large' }}
                      align="center"
                      round="xlarge"
                      margin="small"
                      onClick={() => setShowVideo(false)}
                    >
                      close
                    </Box>
                  </Box>
                )}
              </Layer>
            )}
          </Box>

          <Box
            className="info-box-wrapper"
            display="flex"
            direction="column"
            justify="start"
          >
            <Box
              className="info-box"
              display="flex"
              direction="column"
              justify="start"
              height="16em"
            >
              <Box className="title-box">
                <Heading level="1" margin="0">
                  {title}
                </Heading>
                <Text size="0.9em">({releaseDate})</Text>
                {genres[0] && 
									<Text size="0.9em">
										({genres[0].name})
									</Text>}
              </Box>
              <br />
              {tagline && (
                <Text margin={{ top: 'xsmall', bottom: 'medium' }}>
                  {tagline}
                </Text>
              )}
              <Text>{overview}</Text>
            </Box>
          </Box>
        </Box>

        <Box className="media-box">
          {backdropPath && (
            <Box className="images-box">
              <Image
                src={`/films/images/backdrop${backdropPath}?size=large`}
                alt={`${title} backdrop image`}
              />
            </Box>
          )}
          {videos[0] && <Box className="videos-box"></Box>}
        </Box>

        <Box className="credits-box">
          <Box className="cast-box"></Box>
          <Box className="crew-box"></Box>
        </Box>
      </Box>
    );
  } else {
    return <Heading level="2">Loading...</Heading>;
  }
};

export default FilmDetailPage;
