import React, { useState } from 'react';
import { Box, Button, Collapsible, Heading, Image, Grommet, Layer, ResponsiveContext, Text } from 'grommet';
import { FormClose, Menu, Search } from 'grommet-icons';
// import './App.css';

let movies = [
  {
    title: 'Thor: Ragnorok',
    year: 2016,
    poster_url: 'https://images.fandango.com/images/fandangoblog/Thor_ChingPoster.jpg',
  },
  {
    title: 'Kung Fu Panda',
    year: 2006,
    poster_url: 'https://images-na.ssl-images-amazon.com/images/I/51XhnMdSQdL._AC_SY450_.jpg',
  },
  {
    title: 'Drive',
    year: 2009,
    poster_url: 'https://i.ebayimg.com/images/g/V2gAAOSw7URfUkMH/s-l1600.jpg',
  }
]  

const theme = {
  global: {
    colors: {
      brand: '#228BE6',
      bg: '#fcfcfc',
    },
    font: {
      family: 'Ubuntu',
      size: '18px',
      weight: '400',
      height: '20px',
    }
  }
}

const Header = (props) => (
  <Box 
    as="header"
    direction="row"
    width="100%"
    align="center"
    justify="between"
    background="brand"
    pad={{left: 'medium', right: 'small', vertical: 'medium'}}
    elevation="small"
    style={{ 
      zIndex: '1',
      position: 'fixed'
    }}
    {...props}
  />
)

const PosterCard = (props) => (
  <Box
    flex
    direction="column"
    pad="small"
    margin="medium"
    align="center"
    justify="center"
    round="small"
    width="80%"
    height="auto"
    background="#3b3b3b"
    elevation="large"
    onClick={()=>console.log('clicked a card')}

  >
    <Box
      height="medium"
      width="medium"
      round="small"
      overflow="hidden"
      // border={{
      //   "side": "bottom",
      //   "style": "solid",
      //   "size": "medium"
      // }}
    >
      <Image 
        fill
        fit="contain"
        alt="movie poster"
        src={props.movie.poster_url}
      ></Image>
    </Box>
    <hr />
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
            <Header>
              <Button icon={<Menu />} onClick={() => setShowSidebar(!showSidebar)} />
              <Heading level="1" margin='none'>FilmClub</Heading>
              <Button icon={<Search />} />
            </Header>

            <Box direction="row" flex overflow={{ horizontal: 'hidden' }} pad={{top:"20%"}}>
              <Box flex align="center" justify="center">
                {movies.map((movie, id) => (
                  <PosterCard key={id} movie={movie} />
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
