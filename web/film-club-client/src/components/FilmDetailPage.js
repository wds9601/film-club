import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, Image, Heading, Layer, Text, Video } from 'grommet';
import { CirclePlay, PlayFill } from 'grommet-icons';

import Header from './Header';

const FilmDetailPage = (props) => {
	const [movieDetails, setMovieDetails] = useState({});
	const [showVideo, setShowVideo] = useState(false);

	// React Router URL Parameter object
	let { id } = useParams();

	// // Use the {id} to fetch details about the corresponding movie
	// const getMovieDetails = async (id) => {
	// 	const response = await fetch(`http://localhost:8080/v1/films/${id}`);
	// 	const data = await response.json();
	// 	console.log(data);
	// 	setMovieDetails(data);
	// };

	// // Fetch all movie details with {id} from params, on component load
	useEffect(() => {
		// Use the {id} to fetch details about the corresponding movie
		const getMovieDetails = async (id) => {
			const response = await fetch(`http://localhost:8080/v1/films/${id}`);
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
		posterPath,
		releaseDate,
		similar,
		tagline,
		title,
		overview,
		videos,
		watchProviders,
	} = movieDetails;

	const getMediaUrls = (images, videos) => {
		let backdropUrls = [];
		let posterUrls = [];
		let videoUrls = [];

		images.backdrops.forEach((img) => {
			backdropUrls.push(img.filePath);
		});

		images.posters.forEach((img) => {
			posterUrls.push(img.file_path);
		});

		videos.forEach((video) => {
			videoUrls.push(video.url);
		});

		// console.log(images.backdrops)
		// console.log(images.posters)
	};

	if (movieDetails.images) {
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
				pad="large"
			>
				<Header />
				<Box
					className="hero-box"
					display="flex"
					direction="row"
					justify="around"
					align="center"
					margin={{ top: '4em' }}
				>
					<Box className="poster-box" pad="small" width={{ min: '5em' }}>
						<Box>
							<Image
								src={`http://localhost:8080/v1/films/images/poster${posterPath}?size=large`}
								alt={`${title} poster image`}
							/>
						</Box>
						<Box
							className="trailer-box"
							display="flex"
							direction="row"
							justify="around"
							onClick={ () => setShowVideo(true) }
							focusIndicator={false}
						>
							<Text>Watch Trailer</Text>
							<CirclePlay size="25em" color="accent-4" />
						</Box>
						{showVideo && 
							<Layer 
								modal={true} 
								responsive={true}
								onEsc={()=> setShowVideo(false)}
								onClickOutside={()=> setShowVideo(false)}
								>
									<iframe width="560" height="315" src={`https://www.youtube.com/embed/${videos[0].key}`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
									{/* https://www.themoviedb.org/movie/550-fight-club#play=BdJKm16Co6M */}
								{/* <Video controls={false} autoplay={false} preLoad>
									<source key="video" src={`https://www.youtube.com/watch?v=${videos[0].url}&feature=youtu.be`}/>
									<track
										key='cc'
										label='English'
										kind='subtitles'
										srcLang='en'
										src={videos[0].url}
										default={true}
									/>
								</Video> */}
							</Layer>
						}
					</Box>
					<Box
						className="info-box"
						display="flex"
						direction="column"
						justify="between"
						height="16em"
					>
						<Box className="title-box">
							<Heading level="2" margin="0">
								{title}
							</Heading>
							<Text size="0.9em">({releaseDate})</Text>
							<Text size="0.9em">({genres[0].name})</Text>
						</Box>
						<br />
						<Text>{tagline}</Text>
						<Text>{overview}</Text>
					</Box>
				</Box>

				<Box className="media-box">
					<Box className="images-box">
						<Image
							src={`http://localhost:8080/v1/films/images/poster${backdropPath}?size=large`}
							alt={`${title} poster image`}
						/>
					</Box>
					<Box className="videos-box"></Box>
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
