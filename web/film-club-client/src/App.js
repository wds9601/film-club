import React, { useState, useContext, useEffect } from 'react';
import { Box, Button, Collapsible, Card, Grid, Grommet, Heading, InfiniteScroll, Layer, ResponsiveContext, Sidebar, Text, grommet } from 'grommet';
import { FormClose, Menu, Search } from 'grommet-icons';
import { deepMerge } from 'grommet/utils'

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
        value: 2000,
      },
    },
  },
})

// Grid Column Layout
const columns = {
  small: ['auto'],
  medium: ['50%', '50%'],
  large: ['50%', '50%'],
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
  let rowsVal = rows;
  if (rows) {
    if (rows[size]) {
      rowsVal = rows[size]
    }
  }

  let columnsVal = columns;
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

  // Get first batch of film data
  const getUpcomingMovies = async () => {
    const response = await fetch("/films/upcoming")
    const data = await response.json()
    console.log(data.films)
    setMovies(data.films)
  }

  useEffect(() => {
    getUpcomingMovies()
    // loadFilms()
    }, [])

  return (
    <Grommet theme={customBreakpoints} full>
          <Box background="light-3">
            <Header>
              <Button icon={<Menu />} onClick={() => setShowSidebar(!showSidebar)} />
              <Heading level="1" margin='none'>FilmClub</Heading>
              <Button icon={<Search />} />
            </Header>
            <Box height="auto" margin={{"top": "xlarge"}}>
              <Responsive gap="large" margin="xlarge" >
                {movies[0] 
                  ? movies.map((movie, id) => (
                      <PosterCard key={id} movie={movie} />
                    ))
                  : <Heading level="1">Loading...</Heading>
                }
              </Responsive>
            </Box>
          </Box>
    </Grommet>
  );
}

export default App;




// // // 1.16.21 Working JSX
// return (
//   <Grommet theme={customBreakpoints} full>
//         <Box background="light-3">
//           <Header>
//             <Button icon={<Menu />} onClick={() => setShowSidebar(!showSidebar)} />
//             <Heading level="1" margin='none'>FilmClub</Heading>
//             <Button icon={<Search />} />
//           </Header>
//           <Box height="auto" margin={{"top": "xlarge"}}>
//             <Responsive gap="large" margin="xlarge" >
//               { (movies[0]) ? 
//                 movies.map((movie, id) => (
//                   <PosterCard key={id} movie={movie} />
//                 ))
//                 : 
//                 <Heading level="1">Loading...</Heading>
//               }
//             </Responsive>
//           </Box>
//         </Box>
//   </Grommet>
// );