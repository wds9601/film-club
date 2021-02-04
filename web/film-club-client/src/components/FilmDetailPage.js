import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Image, Heading, Text } from 'grommet';


const FilmDetailPage = (props) => {

    // React Router URL Parameter object
    let { id } = useParams();
    console.log(id)
    console.log(props.film.posterPath)

    // Until ".../film/:id" route on backend, need to use props to 
    // useEffect(() => {
    //     let filmObj = {};
    //     let fetchFilmObject = async () => {
    //         let url = `/films/images/poster${props.film.posterPath}?size=small`;
    //         let response = await fetch(url);
    //         filmObj = await response.json();
    //         console.log(filmObj)
    //     };
    //     fetchFilmObject()
    // }, [props.film])

    return (
        props.film.id
            ?   <Box >
                    <Image src={`http://localhost:8080/v1/films/images/poster${props.film.posterPath}?size=large`}></Image>
                    <Box>
                        <Heading level="2">{props.film.title}</Heading>
                        <br/>
                        <Text>{props.film.overview}</Text>
                    </Box>
                </Box>
            :   <Heading level="2">Loading..</Heading>
    )
}

export default FilmDetailPage