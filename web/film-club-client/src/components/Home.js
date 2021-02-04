import React, { useState, useContext} from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Collapsible, Grid, Grommet, Heading, InfiniteScroll, Layer, ResponsiveContext, Sidebar, grommet } from 'grommet';
import { FormClose, Menu, Search } from 'grommet-icons';
import { deepMerge } from 'grommet/utils';

// Import Custom Components
import Header from './Header'
import PosterCard from './PosterCard'

// // Grommet Responsive Grid Configuration
// Declare custom Breakpoints for screen size
const customBreakpoints = deepMerge(grommet, {
global: {
    breakpoints: {
    small: {
        value: 600,
    },
    medium: {
        value: 1000,
    },
    large: {
        value: 1600,
    },
    },
},
})

// Grid Column Layout
const columns = {
small: ['100%'],
medium: ['50%', '50%'],
large: ['33%', '33%', '33%'],
}

// Grid Row Layout
const rows = {
small: ['auto'],
medium: ['auto'],
large: ['auto'],
}

// Responsive Grid Logic
const Responsive = ({ children, ...props }) => {
const size = useContext(ResponsiveContext)
let rowsVal = rows
if (rows) {
    if (rows[size]) {
    rowsVal = rows[size]
    }
}

let columnsVal = columns
if (columns) {
    if (columns[size]) {
    columnsVal = columns[size]
    }
}

return (
    <Grid
    rows={ !rowsVal ? size : rowsVal }
    columns={ !columnsVal ? size : columnsVal }
    {...props}
    >
    {children}
    </Grid>
)
}


function Home(props) {
    return (
        <Grommet theme={customBreakpoints} full>
                <Box background="dark-1">
                <Header>
                    {/* <Button icon={<Menu />} onClick={() => setShowSidebar(!showSidebar)} /> */}
                    <Heading level="1" margin='none'>FilmClub</Heading>
                    <Button icon={<Search />} />
                </Header>
                <Box height="auto" margin={{"top": "xlarge"}}>
                    <Responsive gap="medium" margin="xlarge" >
                        <InfiniteScroll items={props.movies} step={20} onMore={props.getUpcomingMovies}>
                            {(movie, index) => (
                            <Link to={`/detail/${index}`} key={index}>
                                <PosterCard setFilm={props.setFilm} movie={movie} key={index} />
                            </Link>
                            )}
                        </InfiniteScroll>
                    </Responsive>
                </Box>
                </Box>
        </Grommet>
    );
}

export default Home;