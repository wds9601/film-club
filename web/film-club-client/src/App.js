import React, { useState } from 'react';
import { Box, Button, Collapsible, Heading, Grommet, Layer, ResponsiveContext } from 'grommet';
import { FormClose, Notification } from 'grommet-icons';
// import './App.css';

// let movies = [
//   {
//     title: 'Drive',
//     year: 2009,
//     poster_url: 'https://i.ebayimg.com/images/g/V2gAAOSw7URfUkMH/s-l1600.jpg',
//   },
//   {
//     title: 'Thor: Ragnorok',
//     year: 2016,
//     poster_url: 'https://images.fandango.com/images/fandangoblog/Thor_ChingPoster.jpg',
//   },
//   {
//     title: 'Kung Fu Panda',
//     year: 2006,
//     poster_url: 'https://images-na.ssl-images-amazon.com/images/I/51XhnMdSQdL._AC_SY450_.jpg',
//   }
// ]  

const theme = {
  global: {
    colors: {
      brand: '#228BE6'
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
    style={{zIndex: '1' }}
    {...props}
  />
)

function App() {
  const [showSidebar, setShowSidebar] = useState(false)

  return (
    <Grommet theme={theme} full>
      <ResponsiveContext.Consumer>
        { size => (
          <Box fill>
            <AppBar>
              <Heading level='3' margin='none'>Hello Film Club! -From Grommet</Heading>
              <Button icon={<Notification />} onClick={() => setShowSidebar(!showSidebar)} />
            </AppBar>

            <Box direction="row" flex overflow={{ horizontal: 'hidden' }} >
              <Box flex align="center" justify="center">
                app body
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
