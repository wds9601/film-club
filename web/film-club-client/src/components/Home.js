import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Grid,
  Grommet,
  InfiniteScroll,
  ResponsiveContext,
  grommet,
} from 'grommet';
import { deepMerge } from 'grommet/utils';

// Import Custom Components
import Header from './Header';
import PosterCard from './PosterCard';

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
});

// Grid Column Layout
const columns = {
  small: ['100%'],
  medium: ['50%', '50%'],
  large: ['23.5%', '23.5%', '23.5%', '23.5%'],
};

// Grid Row Layout
const rows = {
  small: ['auto'],
  medium: ['auto'],
  large: ['auto'],
};

// Responsive Grid Logic
const Responsive = ({ children, ...props }) => {
  const size = useContext(ResponsiveContext);

  let rowsVal = rows;
  if (rows) {
    if (rows[size]) {
      rowsVal = rows[size];
    }
  }

  let columnsVal = columns;
  if (columns) {
    if (columns[size]) {
      columnsVal = columns[size];
    }
  }

  return (
    <Grid
      rows={!rowsVal ? size : rowsVal}
      columns={!columnsVal ? size : columnsVal}
      {...props}
    >
      {children}
    </Grid>
  );
};

function Home(props) {
  const [movies, setMovies] = useState([]);

  // Get all film data and concat to 'movies' array for Infinite Scroll use
  const getUpcomingMovies = async () => {
    const page = movies.length / 20 + 1;
    const response = await fetch(`/films/upcoming?page=${page}`);
    const data = await response.json();
    setMovies(movies.concat(data.films));
  };

  return (
    <Grommet theme={customBreakpoints} full>
      <Box background="dark-1">
        <Header />
        <Box height="auto" pad={{ top: 'large' }}>
          <Responsive
            gap="medium"
            pad={{ vertical: 'xlarge', horizontal: 'large' }}
          >
            <InfiniteScroll items={movies} step={20} onMore={getUpcomingMovies}>
              {(movie, index) => (
                <Link
                  to={`/detail/${movie.id}`}
                  key={index}
                  style={{ textDecoration: 'none' }}
                >
                  <PosterCard
                    setMovieId={props.setMovieId}
                    movie={movie}
                    key={index}
                  />
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
