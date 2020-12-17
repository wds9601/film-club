import React, { useState } from 'react';
import { Box, Button, Collapsible, Heading, Image, Grommet, Layer, ResponsiveContext, Text } from 'grommet';
import { FormClose, Notification, FormSearch, Search } from 'grommet-icons';
// import './App.css';

let movies = [
  {
    // poster_url: 'https://place-puppy.com/300x300',
    title: 'Drive',
    year: 2009,
    poster_url: 'https://i.ebayimg.com/images/g/V2gAAOSw7URfUkMH/s-l1600.jpg',
  },
  {
    title: 'Thor: Ragnorok',
    year: 2016,
    poster_url: 'https://images.fandango.com/images/fandangoblog/Thor_ChingPoster.jpg',
  },
  {
    title: 'Kung Fu Panda',
    year: 2006,
    poster_url: 'https://images-na.ssl-images-amazon.com/images/I/51XhnMdSQdL._AC_SY450_.jpg',
  }
]  

const theme = {
  global: {
    colors: {
      brand: '#228BE6',
      bg: '#0d0d0d',
    },
    font: {
      family: 'Ubuntu',
      size: '18px',
      weight: '400',
      height: '20px',
    }
  }
}

const AppBar = (props) => (
  <Box 
    tag="header"
    direction="row"
    align="center"
    justify="between"
    background="brand"
    pad={{left: 'medium', right: 'small', vertical: 'medium'}}
    elevation="medium"
    style={{ zIndex: '1' }}
    {...props}
  />
)

const Card = (props) => (
  <Box
    flex
    direction="column"
    pad="small"
    margin="small"
    align="center"
    justify="center"
    round="small"
    width="70%"
    height={ {min: "25%", max: "40%"} }
    background="#3b3b3b"
  >
    <Box
      height="medium"
      width="medium"
      round="small"
      overflow="hidden"
    >
      <Image 
        fill
        alt="movie poster"
        
        src={props.movie.poster_url}
      ></Image>
    </Box>
    <Heading
      margin="small"
    >{props.movie.title}</Heading>
    <Text>{props.movie.year}</Text>
  </Box>
)

function App() {
  const [showSidebar, setShowSidebar] = useState(false)

  return (
    <Grommet theme={theme} full>
      <ResponsiveContext.Consumer>
        { size => (
          <Box background="bg">
            <AppBar>
              <Heading level="1" margin='none'>FilmClub <Text size="medium">by Grommet</Text></Heading>
              <Button icon={<Search />} onClick={() => setShowSidebar(!showSidebar)} />
            </AppBar>

            <Box direction="row" flex overflow={{ horizontal: 'hidden' }} >
              <Box flex align="center" justify="center">
                {movies.map((movie, id) => (
                  <Card key={id} movie={movie} />
                ))}
              </Box>
              {(!showSidebar || size !== 'small') ? (
                <Collapsible direction="horizontal" open={showSidebar}>
                  <Box
                    flex
                    width="medium"
                    background="light-2"
                    elevation="small"
                    align="center"
                    justify="center"
                  >
                    sidebar
                  </Box>
                </Collapsible>
              ) : (
                <Layer>
                  <Box
                    background="light"
                    tag="header"
                    justify="end"
                    align="center"
                    direction="row"
                  >
                    <Button icon={<FormClose />} onClick={() => setShowSidebar(false)} />
                  </Box>
                  <Box
                    fill
                    background='light-2'
                    align="center"
                    justify="center"
                    >
                      sidebar
                  </Box>  
                </Layer>
              )}
            </Box>
          </Box>
        )}
      </ResponsiveContext.Consumer>
    </Grommet>
  );
}

export default App;
