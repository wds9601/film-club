import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Image, Heading, Text } from 'grommet';

import Header from './Header'


const FilmDetailPage = (props) => {

    // React Router URL Parameter object
    let { id } = useParams();
    console.log(id)
    console.log(props.film.posterPath)

    return (
        <Box>
            <Header />
            { props.film.id
                ?   
                <Box 
                display="flex"
                direction="column"
                justify="around"
                align="center"
                background="dark-2"
                pad={{"top":"8em", "horizontal":"5em"}}
                height="auto"
                >
                    <Box 
                    fit
                    // fill
                    pad="small"
                    margin="medium"
                    >
                        <Image src={`http://localhost:8080/v1/films/images/poster${props.film.posterPath}?size=medium`}></Image>
                    </Box>
                    <Box>
                        <Heading level="2">{props.film.title}</Heading>
                        <br/>
                        <Text>{props.film.overview}</Text>
                    </Box>
                </Box>
                :   
                    <Heading level="2">Loading..</Heading>
            }
        </Box>
    )
}

export default FilmDetailPage