import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Image, Heading, Text } from 'grommet';

import Header from './Header';

const FilmDetailPage = (props) => {
	// State object to hold the film details when the fetch is complete
	const [movieDetails, setMovieDetails] = useState({});

	// React Router URL Parameter object
	let { id } = useParams();

	// Use the {id} to fetch details about the corresponding movie
	const getMovieDetails = async (id) => {
		const response = await fetch(`http://localhost:8080/v1/films/${id}`);
		const data = await response.json();
		setMovieDetails(data);
		console.log(data);
	};

	// When {id} is assigned call fetch with the id
	useEffect(() => {
		getMovieDetails(id);
	}, [id]);

	let {
		backdropPath,
		credits,
		images,
		posterPath,
		releaseDate,
		similar,
		tagline,
		title,
		overview,
		video,
		watchProviders,
	} = movieDetails;

	return (
		<Box className="page-box"
			overflow={{
				"vertical": "scroll"
			}}
			display="flex"
			direction="column"
			justify="around"
			background="dark-2"
			height
		>
			<Header />
			<Box className="hero-box">
				<Box className="poster-box"
					
					pad={{ vertical: '6em', horizontal: '5em' }}
					height="auto"
				>
					<Box pad="small">
						<Image
							src={`http://localhost:8080/v1/films/images/poster${posterPath}?size=medium`}
							alt={`${title} poster image`}
						></Image>
					</Box>
				</Box>
				<Box>
					<Heading level="2">{title}</Heading>
					<br />
					<Text>{overview}</Text>
				</Box>
			</Box>
		</Box>
	);
};

export default FilmDetailPage;
