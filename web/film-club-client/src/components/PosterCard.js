import React, { useContext } from 'react';
import { Anchor, Box, Image, Heading, ResponsiveContext, Text} from 'grommet';
import { List, StatusGood } from 'grommet-icons';

import defaultMoviePoster from '../static/default-movie-poster.png';

const PosterCard = (props) => {
    let size = useContext(ResponsiveContext)

    let imagePath = props.movie.posterPath
    let imageUrl = props.movie.posterPath 
        ? `http://localhost:8080/v1/films/images/poster${imagePath}?size=medium` 
        : defaultMoviePoster

    return (size !== 'large') ? (
    <Box
        flex
        direction="column"
        pad="small"
        align="center"
        round="medium"
        background="#3b3b3b"
        onClick={()=>console.log('clicked a card')}
        margin={{bottom: "large"}}
    >
        <Box fill>
            <Image
                alt="movie poster"
                src={imageUrl}
            />
        </Box>
        <Box display="flex" direction="row" align="center" justify="between" width="100%">
            <Box display="flex" direction="column" justify="center">
                <Box>
                    <Heading level="2">{props.movie.title}</Heading>
                </Box>
                <Box>
                    <Heading level="4">{props.movie.releaseDate}</Heading>
                </Box>
            </Box>
            <Box>
                <Anchor onClick={()=> console.log('You clicked the Add to List button')} hoverIndicator={{color: "accent-2"}}>
                    <List
                        size="large"
                        color="accent-4"
                    />
                </Anchor>
            </Box>
        </Box>
    </Box>
    )
    : (
    <Box
        flex
        direction="column"
        pad="xsmall"
        width="medium"
        justify="center"
        round="xsmall"
        height="auto"
        background="#3b3b3b"
    >
        <Box onClick={()=>console.log('clicked a card')}>
            <Image 
                alt="movie poster"
                src={imageUrl}
            >
            </Image>
        </Box>
        <Box
            display="flex"
            direction="row"
            justify="between"
            width="100%"
            pad="small"
        >
            <Box>
                <Heading 
                    responsive={true} 
                    textAlign="" 
                    level="3" 
                    size="medium" 
                    margin="none"
                >
                    {props.movie.title}
                </Heading>
                <Text >{props.movie.releaseDate}</Text>
            </Box>
            <Box>
                <Anchor onClick={()=> console.log('You clicked the Add to List button')} hoverIndicator={{color: "accent-2"}}>
                    <List
                        size="large"
                        color="accent-4"
                    />
                </Anchor>
            </Box>
        </Box>
    </Box>
    )
}

export default PosterCard;