import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Image, Heading, Text } from 'grommet';

import Header from './Header';

const FilmDetailPage = (props) => {
	// React Router URL Parameter object
	let { id } = useParams();

	const getMovieDetails = async (id) => {
		const response = await fetch(`http://localhost:8080/v1/films/${id}`);
		const data = await response.json();
		// props.setMovieId(data)
		console.log(data);
	};

	getMovieDetails(id);

	let { posterPath, title, overview } = props.movieId;

	return (
		<Box>
			<Header />
			{id ? (
				<Box
					display="flex"
					direction="column"
					justify="around"
					align="center"
					background="dark-2"
					pad={{ vertical: '6em', horizontal: '5em' }}
					height="auto"
				>
					<Box pad="small">
						<Image
							src={`http://localhost:8080/v1/films/images/poster${posterPath}?size=medium`}
							alt={`${title} poster image`}
						></Image>
					</Box>
					<Box>
						<Heading level="2">{title}</Heading>
						<br />
						<Text>{overview}</Text>
					</Box>
				</Box>
			) : (
				<Heading level="2">Loading..</Heading>
			)}
		</Box>
	);
};

export default FilmDetailPage;
