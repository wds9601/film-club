import React, { useState, useContext, useEffect } from 'react';
import { Box, Button, Collapsible, Card, Grid, Grommet, Heading, InfiniteScroll, Layer, ResponsiveContext, Sidebar, Text, grommet } from 'grommet';
import { FormClose, Menu, Search } from 'grommet-icons';
import { deepMerge } from 'grommet/utils'

// Import Custom Components
import PosterCard from './components/PosterCard'
import Header from './components/Header'

// // Grommet Responsive Grid Configuration
// Declare custom Breakpoints for screen size
const customBreakpoints = deepMerge(grommet, {
  global: {
    breakpoints: {
      small: {
        value: 600,
      },
      medium: {
        value: 900,
      },
      large: {
        value: 1600,
      },
    },
  },
})

// Grid Column Layout
const columns = {
  small: ['auto'],
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

function App() {
  const [showSidebar, setShowSidebar] = useState(false)
  const [movies, setMovies] = useState([])

  // Get all film data and concat to 'movies' array for Infinite Scroll use
  const getUpcomingMovies = async () => {
    const page = (movies.length / 20) + 1
    const response = await fetch(`/films/upcoming?page=${page}`)
    const data = await response.json()
    setMovies(movies.concat(data.films))
  }

  return (
    <Grommet theme={customBreakpoints} full>
          <Box background="dark-1">
            <Header>
              <Button icon={<Menu />} onClick={() => setShowSidebar(!showSidebar)} />
              <Heading level="1" margin='none'>FilmClub</Heading>
              <Button icon={<Search />} />
            </Header>
            <Box height="auto" margin={{"top": "xlarge"}}>
              <Responsive gap="medium" margin="xlarge" >
                <InfiniteScroll items={movies} step={20} onMore={getUpcomingMovies}>
                  {(movie, index) => (
                    <PosterCard movie={movie} key={index} />
                  )}
                </InfiniteScroll>
              </Responsive>
            </Box>
          </Box>
    </Grommet>
  );
}

export default App;