import React, { useContext } from 'react';
import { Box, Image, Heading, ResponsiveContext, Text} from 'grommet';

const PosterCard = (props) => {
    let size = useContext(ResponsiveContext)
    return (size !== 'large') ? (
    <Box
        flex
        direction="column"
        pad="small"
        align="center"
        justify="around"
        round="medium"
        width="auto"
        height="auto"
        background="#3b3b3b"
        elevation="large"
        onClick={()=>console.log('clicked a card')}
        margin={{bottom: "large"}}
    
    >
        <Box
        height="medium"
        width="auto"
        round="small"
        overflow="hidden"
        >
        <Image 
            fill
            fit="contain"
            alt="movie poster"
            src={`http://localhost:8080/v1/films/images/poster${props.movie.posterPath}?size=medium`}
        ></Image>
        </Box>
        <Heading margin="small" height="auto" width="auto">{props.movie.title}</Heading>
        <Text>{props.movie.year}</Text>
    </Box>
    )
    : (
    <Box
        flex
        direction="row"
        pad="small"
        align="center"
        round="medium"
        width="auto"
        height="auto"
        background="#3b3b3b"
        elevation="large"
        onClick={()=>console.log('clicked a card')}
        margin={{bottom: "large"}}
    
    >
        <Box
        height="100%"
        width="50%"
        round="small"
        overflow="hidden"
        margin={{
            "right": "small"
        }}
        >
        <Image 
            fill
            alt="movie poster"
            src={`http://localhost:8080/v1/films/images/poster${props.movie.posterPath}?size=medium`}
        ></Image>
        </Box>
        <Box 
        display="flex" 
        direction="column" 
        flex-wrap="wrap" 
        height="90%" 
        width="100%" 
        justify="around" 
        align="center"
        border={{
            "color": "accent-4",
            "side": "left",
            "size": "medium",
            "style": "solid"
        }}
        pad="small"
        >
        <Heading responsive={true} textAlign="center" level="2" size="medium" margin="none">{props.movie.title}</Heading>
        <Text>{props.movie.releaseDate}</Text>
        </Box>
    </Box>
    )
}

export default PosterCard;