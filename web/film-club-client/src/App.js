import React, { useState, useContext, useEffect } from 'react';
import { Box, Button, Collapsible, Card, Grid, Grommet, Heading, Image, Layer, ResponsiveContext, Sidebar, Text, grommet } from 'grommet';
import { FormClose, Menu, Search } from 'grommet-icons';
import { deepMerge } from 'grommet/utils'
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
    pad={{"horizontal": "medium", vertical: 'medium'}}
    margin={{bottom: 'large'}}
    elevation="small"
    style={{ 
      zIndex: '1',
      position: 'fixed'
    }}
    {...props}
  />
)

const PosterCard = (props) => {
  let size = useContext(ResponsiveContext)
  return (size !== 'large') ? (
    <Box
      flex
      direction="column"
      pad="small"
      align="center"
      justify="space-around"
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
  : (
    <Box
      flex
      direction="row"
      pad="small"
      align="center"
      justify="space-between"
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
      >
        <Image 
          fill
          alt="movie poster"
          src={props.movie.poster_url}
        ></Image>
      </Box>
      <Box display="flex" direction="column" flex-wrap="wrap" height="100%" width="100%" justify="space-around" align="center">
        <Heading responsive="true" textAlign="center" size="medium">{props.movie.title}</Heading>
        <Text>{props.movie.year}</Text>
      </Box>
    </Box>
  )
}

// const listMovies = () => {
//   console.log(movies)
//   movies.map((id, movie) => (
//     <PosterCard key={id} movie={movie} />
//   ))
// }

const getUpcomingMovies = async () => {
  // const request = new Request("http://localhost:8080/v1/films/upcoming", {
  //   method: 'GET',
  //   mode: 'cors',
  //   headers: {
  //     'Access-Control-Allow-Origin': 'cross-site',
  //     'Content-Type': 'application/json'
  //   }
  // })

  const url = "http://localhost:8080/v1/films/upcoming"
  const response = await fetch(url)
  console.log(response)
}
    // const getUpcomingMovies = async () => {
    //   const request = new Request("http://localhost:8080/v1/films/upcoming")
    //   const response = await fetch(request)
    //   console.log(response)
    // }
  
    // const response = await fetch(request, { 
    //   method: 'GET',
    //   mode: 'cors',
    //   headers: {
    //     'Access-Control-Allow-Origin': '*',
    //     'Content-Type': 'application/json'
    //   }
    // })
    // console.log(response)


//////
// const url = "http://localhost:8080/v1/films/upcoming"

  // .then((response) => {
  //   console.log(response)
  //   // const data = response.json()
  //   // console.log(data)
  // })
  // .catch((err) => {console.log("ERROR #####", err)})

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

const columns = {
  small: ['auto'],
  medium: ['50%', '50%'],
  large: ['50%', '50%'],
  xlarge: ['50%', '50%'],
}

const rows = {
  small: ['30%'],
  medium: ['40%'],
  large: ['50%'],
  xlarge: ['large'],
}

const Responsive = ({
  children,
  ...props
}) => {
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

  useEffect(() => {
    getUpcomingMovies()
    }, [])

  return (
    <Grommet theme={customBreakpoints} full>
          <Box background="light-3">
            <Header>
              <Button icon={<Menu />} onClick={() => setShowSidebar(!showSidebar)} />
              <Heading level="1" margin='none'>FilmClub</Heading>
              <Button icon={<Search />} />
            </Header>
            <Box height="auto" margin={{"vertical": "xlarge"}}>
              <Responsive gap="small" margin="xlarge" >
                {movies.map((movie, id) => (
                  <PosterCard key={id} movie={movie} />
                ))}
              </Responsive>
            </Box>
          </Box>
    </Grommet>
  );
}

export default App;


// <Header>
//                 <Button icon={<Menu />} onClick={() => setShowSidebar(!showSidebar)} />
//                 <Heading level="1" margin='none'>FilmClub</Heading>
//                 <Button icon={<Search />} />
//               </Header>

//               <Box direction="row" flex overflow={{ horizontal: 'hidden' }} pad={{top:"20%", bottom: "5%"}}>
//                 <Box flex align="center" justify="center">
//                   {movies.map((movie, id) => (
//                     <PosterCard key={id} movie={movie} />
//                   ))}
//                 </Box>
//                 {(!showSidebar || size !== 'small') ? (
//                   <Collapsible direction="horizontal" open={showSidebar}>
//                     <Box
//                       flex
//                       width="medium"
//                       height="small"
//                       background="light-2"
//                       elevation="small"
//                       align="center"
//                       justify="center"
//                     >
//                       menu items here
//                     </Box>
//                   </Collapsible>
//                 ) : (
//                     <Sidebar width="medium" collapsible="true">
//                       <Box
//                         background="light"
//                         tag="header"
//                         justify="end"
//                         align="center"
//                         direction="row"
//                       >
//                         <Button icon={<FormClose />} onClick={() => setShowSidebar(false)} />
//                       </Box>
//                       <Box
//                         background='light-2'
//                         align="center"
//                         justify="center"
//                         >
//                           menu items here
//                       </Box>  
//                     </Sidebar>
//                 )}
//               </Box>