import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Link,
  Routes,
  Route
} from 'react-router-dom';

//importing components
import Home from './Pages/Home';
import Movies from './Pages/Movies';
import TvShows from './Pages/TvShows';


export default class App extends Component{

  render(){
    return(
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="Movies">Filmes</Link>
            </li>
            <li>
              <Link to="TvShows">Séries</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home/>}>Home</Route>
          <Route path='Movies' element={<Movies/>}>Filmes</Route>
          <Route path="TvShows" element={<TvShows/>}>Séries</Route>
        </Routes>
      </Router>
    )
  };
};