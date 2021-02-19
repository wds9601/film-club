import React from 'react';
import { Box, Button, Image, Text } from 'grommet';
import { Add, Play } from 'grommet-icons';

import defaultMoviePoster from '../static/default-movie-poster.png';

const PosterCard = (props) => {
	let { id, posterPath, releaseDate, title } = props.movie;

	// Format movie release date for better UX
	// const formatDate = (releaseDate) => {
	// 	let today = new Date();

	// 	// if (today.getDate() === )
	// }

	let formattedDate = releaseDate.replaceAll('-', '.');
	const releaseDay = formattedDate.substring(8);

	let numReleaseDay = parseInt(releaseDay);
	let today = new Date().getDate();
	let tomorrow = today + 1;
	if (today === numReleaseDay) {
		formattedDate = 'Today';
	} else if (tomorrow === numReleaseDay) {
		formattedDate = 'Tomorrow';
	}

	let dateOnly = formattedDate.slice();

	console.log('today', today);
	console.log('day.int.substring', numReleaseDay);
	console.log('formattedDate', formattedDate);
	console.log('dateOnly', dateOnly);

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
						{formattedDate}
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
