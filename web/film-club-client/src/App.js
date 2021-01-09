import React, { useState, useContext } from 'react';
import { Box, Button, Collapsible, Card, Grid, Grommet, Heading, Image, Layer, ResponsiveContext, Sidebar, Text, grommet } from 'grommet';
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

// const theme = {
//   global: {
//     colors: {
//       brand: '#228BE6',
//       bg: '#fcfcfc',
//     },
//     font: {
//       family: 'Ubuntu',
//       size: '18px',
//       weight: '400',
//       height: '20px',
//     }
//   }
// }

const Header = (props) => (
  <Box 
    as="header"
    direction="row"
    width="100%"
    align="center"
    justify="between"
    background="accent-4"
    pad={{left: 'medium', right: 'small', vertical: 'medium'}}
    margin={{bottom: 'large'}}
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
    align="center"
    justify="center"
    round="small"
    width={{
      "min": "30%",
      "max": "80%"
    }}
    height="auto"
    background="#3b3b3b"
    elevation="large"
    onClick={()=>console.log('clicked a card')}
    margin={{bottom: "xlarge"}}

  >
    <Box
      height="medium"
      width="auto"
      round="small"
      overflow="hidden"
      // border={{
      //   "side": "bottom",
      //   "style": "solid",
      //   "size": "medium"
      // }}
    >
      <Image 
        // fill
        // fit="contain"
        width="100%"
        height="100%"
        alt="movie poster"
        src={props.movie.poster_url}
      ></Image>
    </Box>
    <Heading margin="small">{props.movie.title}</Heading>
    <Text>{props.movie.year}</Text>
  </Box>
)

function App() {
  const [showSidebar, setShowSidebar] = useState(false)

  const size = useContext(ResponsiveContext)

  return (
    <Grommet theme={grommet} full>
          <Box background="light-3">
            <Grid columns={}>
              <Header>
                <Button icon={<Menu />} onClick={() => setShowSidebar(!showSidebar)} />
                <Heading level="1" margin='none'>FilmClub</Heading>
                <Button icon={<Search />} />
              </Header>

              <Box direction="row" flex overflow={{ horizontal: 'hidden' }} pad={{top:"20%", bottom: "5%"}}>
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
                      height="small"
                      background="light-2"
                      elevation="small"
                      align="center"
                      justify="center"
                    >
                      menu items here
                    </Box>
                  </Collapsible>
                ) : (
                    <Sidebar width="medium" collapsible="true">
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
                        background='light-2'
                        align="center"
                        justify="center"
                        >
                          menu items here
                      </Box>  
                    </Sidebar>
                )}
              </Box>
            </Grid>
          </Box>
    </Grommet>
  );
}

export default App;
