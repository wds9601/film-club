import React from 'react';
import { Box, Button, Image, Text } from 'grommet';
import { Add, Play } from 'grommet-icons';

import defaultMoviePoster from '../static/default-movie-poster.png';

const PosterCard = (props) => {
	let { id, posterPath, releaseDate, title } = props.movie;

	// Format movie release date for better UX
	// Set variables for movie release day, month, year
	const releaseDay = parseInt(releaseDate.substring(8));
	const releaseYear = parseInt(releaseDate.substring(2,4));
	const releaseMonth = parseInt(releaseDate.substring(5,7));

	// Set variables for today's date and format the year to 2 digits
	let currentDay = new Date().getDate();
	let currentMonth = new Date().getMonth() + 1; // Offsets default 0-based month system (e.g. Jan = 0, Feb = 1)
	let currentFullYear = new Date().getFullYear().toString();
	let currentYear = parseInt(currentFullYear.split('').slice(2).join(''));

	// Set variables for formatted whole dates (dd.mm.yy)
	let currentDate = `${currentMonth}.${currentDay}.${currentYear}`;
	let formattedReleaseDate = `${releaseMonth}.${releaseDay}.${releaseYear}`;

	// Compare the release date with today and tomorrow's dates and set the correct value/string
	let tomorrow = `${currentMonth}.${currentDay + 1}.${currentYear}`;;
	if (currentDate === formattedReleaseDate) {
		formattedReleaseDate = 'Today';
	} else if (tomorrow === formattedReleaseDate) {
		formattedReleaseDate = 'Tomorrow';
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
