import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

// Import Custom Components
import Home from './components/Home'
import FilmDetailPage from './components/FilmDetailPage'


function App() {
  // const [showSidebar, setShowSidebar] = useState(false)
  const [movies, setMovies] = useState([])
  const [film, setFilm] = useState({})

  // Get all film data and concat to 'movies' array for Infinite Scroll use
  const getUpcomingMovies = async () => {
      const page = (movies.length / 20) + 1
      const response = await fetch(`/films/upcoming?page=${page}`)
      const data = await response.json()
      setMovies(movies.concat(data.films))
  }

  return (
      <Switch>
        <Route exact path='/'>
          <Home setFilm={setFilm} getUpcomingMovies={getUpcomingMovies} movies={movies} />
        </Route>
        <Route path={'/detail/:id'}>
          <FilmDetailPage film={film} />
        </Route>
      </Switch>
  );
}

export default App;