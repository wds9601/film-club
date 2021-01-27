// import React from 'react';
// import { InfiniteScroll } from 'grommet';



// const InfiniteScroll = (setMovies, {props}) => {
// const getNextPage = async () => {
//     let url = `/films/upcoming?page=${page}`
//     let response = await fetch(url)
//     let data = await response.json()
//     let nextMovies = data.films
//     setMovies(props.movies.push(nextMovies))
//     console.log('INFINTE SCROLL DATA: ', data)
//     // setPage(count++)

//     // console.log("Page after setPage", page)
// }

// const onMore = () => {
//     getNextPage()
// }

// return (
// (movies[0]) ?
//     <Box >
//         <InfiniteScroll items={movies} step={10} onMore={onMore}  {...props}>
//             {(item, index) => (
//                 <PosterCard key={index} movie={item} />
//             )
//             }
//         </InfiniteScroll>
//     </Box>
//     : 
//     <Heading level="1">Loading...</Heading>
// )
// }

// // // in APP before switching back to first page display.  wasnt working..., would log 'on more' at load of app
// // <InfiniteScroll items={movies} step={10} onMore={()=> console.log('!!! On More')}>
// // {(item, index) => {
// //   <PosterCard movie={item} key={index} />
// // }}
// // </InfiniteScroll>