import React from 'react';
import { Box, Button, Image, Text} from 'grommet';
import { List, StatusGood } from 'grommet-icons';

import defaultMoviePoster from '../static/default-movie-poster.png';

const PosterCard = (props) => {

    let imagePath = props.movie.posterPath
    let imageUrl = props.movie.posterPath 
        ? `http://localhost:8080/v1/films/images/poster${imagePath}?size=medium` 
        : defaultMoviePoster

    return (
        <Box
        flex
        direction="column"
        pad="xsmall"
        justify="center"
        round="xsmall"
        background="dark-2"
        onClick={() => props.setFilm(props.movie)}
        hoverIndicator={true}
        focusIndicator={false}>
            <Box 
            fill
            round="xsmall" 
            overflow="hidden">
                <Image
                fill
                background="contain"
                alt="movie poster"
                src={imageUrl}>
                </Image>
            </Box>
            <Box
            display="flex"
            direction="row"
            justify="between"
            width="100%"
            height={{ "min":"2.6em", "max":"3em" }}
            pad={{ "horizontal": "xsmall" }}>
                <Box 
                display="flex" 
                direction="column" 
                justify="between"
                margin={{
                    "right":"small",
                    "top":"0"
                    }}>
                    <Text
                    weight="bold"
                    size="large"
                    truncate={true}>
                        {props.movie.title}
                    </Text >
                    <Text 
                    size="small"
                    weight="bold">
                        {props.movie.releaseDate}
                    </Text>
                </Box>
                <Box 
                display="flex" 
                direction="row" 
                width={{ "min":"5em" }} 
                justify="around" 
                align="end">
                    <Button 
                    onClick={() => console.log("You clicked the Add to MyList icon")}
                    focusIndicator={false}
                    >
                        <List
                        size="30em"
                        color="accent-4"/>
                    </Button>
                    <Button onClick={() => console.log("You clicked the Ive Seen This icon")}>
                        <StatusGood
                        size="30em"
                        color="accent-4"/>
                    </Button>
                </Box>
            </Box>
        </Box>
        )
}

export default PosterCard;