import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';

// Import Custom Components
import Home from './components/Home';
import FilmDetailPage from './components/FilmDetailPage';

function App() {
  const [movieId, setMovieId] = useState({});

  return (
    <Switch>
      <Route exact path="/">
        <Home setMovieId={setMovieId} />
      </Route>
      <Route path={'/detail/:id'}>
        <FilmDetailPage movieId={movieId} />
      </Route>
    </Switch>
  );
}

export default App;
