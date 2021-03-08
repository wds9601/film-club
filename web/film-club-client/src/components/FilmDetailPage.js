import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Image, Heading, Paragraph, Text } from 'grommet';
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
    overview,
		posterPath,
    releaseDate,
    tagline,
		title,
    videos,
  } = movieDetails;


  let formattedReleaseDate
  if (releaseDate) {
    formattedReleaseDate = new Date(releaseDate)
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
		let movieTrailer = videos.filter(video => video.type === 'Trailer')[0];

    return (
      <Box
        className="page-box"
        display="flex"
        direction="column"
        justify="around"
        background="dark-2"
        overflow={{
          vertical: 'scroll',
        }}
        pad="medium"
      >
        <Header />

      <Box className="poster-info-box"
        display="flex"
        direction="column"
        justify="around"
        align="center"
        pad="medium"
        border={{color: 'accent-4', size: 'small'}}
      >
        <Box
          className="poster-box"
          margin={{bottom: '1em'}}
        >
          <Box>
            <Image
              src={posterUrl}
              alt={`${title} poster image`}
            />
          </Box>
        </Box>

        <Box className="info-box">
          <Box className="text-box" text-align='start'>
            <Heading level="2" margin="0">
              {title}
            </Heading>
            <Box className="text-header-group">
              <Text size="0.9em" weight="bold">Release Date:</Text><Text size="0.9em">{formattedReleaseDate}</Text>
            </Box>
            <Box className="text-header-group">
              <Text size="0.9em" weight="bold">Genres:</Text>
              {genres[0] && (
                genres.map(genre => (
                  <Text size="0.9em">
                    {genre.name}
                  </Text>
                )))
              }
            </Box>
            
          </Box>
          <br />
          <Box 
            className="info-text-box" 
            display="flex" 
            direction="column" 
          >
            {tagline && (
              <Box className="text-header-group">
                <Text size="0.9em" weight="bold">Tagline:</Text>
                <Paragraph margin={{ top: 'xsmall', bottom: 'medium' }}>
                  {tagline}
                </Paragraph>
              </Box>
            )}
            {overview && (
              <Box className="text-header-group">
                <Text size="0.9em" weight="bold">Overview:</Text>
                <Paragraph margin={{ top: 'xsmall'}}>
                  {overview}
                </Paragraph>
              </Box>
            )}
          </Box>
        </Box>
      </Box>

        <Box
          className="hero-box"
          display="flex"
          direction="row"
          justify="around"
        >
        

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
            </Box>
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


// Watch trailer button, modal trailer video player
// Should be only trailer video player on page load, no button
{/* <Box
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
)} */}