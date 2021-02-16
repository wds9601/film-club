import React from 'react';
import { Box, Button, Image, Text} from 'grommet';
import { Add, Play } from 'grommet-icons';

import defaultMoviePoster from '../static/default-movie-poster.png';

const PosterCard = (props) => {

    let { id, posterPath, releaseDate, title } = props.movie

    let imagePath = posterPath
    let imageUrl = posterPath 
        ? `http://localhost:8080/v1/films/images/poster${imagePath}?size=medium` 
        : defaultMoviePoster

    return (
        <Box
        flex
        direction="column"
        pad="xsmall"
        justify="between"
        round="xsmall"
        height={{ "min": "100%" }}
        background="dark-2"
        onClick={() => props.setMovieId(props.movie)}
        hoverIndicator={true}
        focusIndicator={false}>
            <Box 
            fill
            round="xsmall" 
            overflow="hidden">
                <Image
                background="cover"
                alt={`${title} poster image`}
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
                        {title}
                    </Text >
                    <Text 
                    size="small"
                    weight="bold">
                        {releaseDate}
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
                        <Add
                        size="30em"
                        color="accent-4"/>
                    </Button>
                    <Button onClick={() => console.log("You clicked the Ive Seen This icon")}>
                        <Play
                        size="30em"
                        color="accent-4"/>
                    </Button>
                </Box>
            </Box>
        </Box>
        )
}

export default PosterCard;