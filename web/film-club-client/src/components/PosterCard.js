import React from 'react';
import { Box, Button, Image, Text } from 'grommet';
import { Add, Play } from 'grommet-icons';

import defaultMoviePoster from '../static/default-movie-poster.png';

const PosterCard = (props) => {
  let { id, posterPath, releaseDate, title } = props.movie;

  // Format movie release date for better UX
  // Set variable for JS date formatted release date
  let formattedReleaseDate = new Date(releaseDate);
  // Set variable for today's date
  let today = new Date();
  // Correct release date formatting for timezone differences
  formattedReleaseDate.setMinutes(
    formattedReleaseDate.getMinutes() + today.getTimezoneOffset()
  );
  // Set variable for tomorrow's date
  const tomorrow = new Date(new Date().setDate(today.getDate() + 1));

  if (
    formattedReleaseDate.getDate() === today.getDate() &&
    formattedReleaseDate.getMonth() === today.getMonth() &&
    formattedReleaseDate.getFullYear() === today.getFullYear()
  ) {
    formattedReleaseDate = 'Today';
  } else if (
    formattedReleaseDate.getDate() === tomorrow.getDate() &&
    formattedReleaseDate.getMonth() === tomorrow.getMonth() &&
    formattedReleaseDate.getFullYear() === tomorrow.getFullYear()
  ) {
    formattedReleaseDate = 'Tomorrow';
  } else {
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

  let imagePath = posterPath;
  let imageUrl = posterPath
    ? `http://localhost:8080/v1/films/images/poster${imagePath}?size=medium`
    : defaultMoviePoster;

  return (
    <Box
      flex
      direction="column"
      pad="xsmall"
      justify="between"
      round="xsmall"
      height={{ min: '100%' }}
      background="dark-2"
      onClick={() => props.setMovieId(id)}
      hoverIndicator={true}
      focusIndicator={false}
    >
      <Box fill round="xsmall" overflow="hidden">
        <Image
          background="cover"
          alt={`${title} poster image`}
          src={imageUrl}
        ></Image>
      </Box>
      <Box
        display="flex"
        direction="row"
        justify="between"
        width="100%"
        height={{ min: '2.6em', max: '3em' }}
        pad={{ horizontal: 'xsmall' }}
      >
        <Box
          display="flex"
          direction="column"
          justify="center"
          margin={{
            right: 'small',
            top: '0',
          }}
        >
          <Text weight="bold" size="med" truncate={true}>
            {title}
          </Text>
          <Text size="xsmall" weight="bold">
            {formattedReleaseDate}
          </Text>
        </Box>
        <Box
          display="flex"
          direction="row"
          width={{ min: '5em' }}
          justify="around"
          align="end"
        >
          <Button
            onClick={() => console.log('You clicked the Add to MyList icon')}
            focusIndicator={false}
          >
            <Add size="30em" color="accent-4" />
          </Button>
          <Button
            onClick={() => console.log('You clicked the Ive Seen This icon')}
          >
            <Play size="30em" color="accent-4" />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default PosterCard;
