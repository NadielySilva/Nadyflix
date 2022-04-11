import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Link,
  Routes,
  Route
} from 'react-router-dom';
import styled from 'styled-components';

//importing components
import Home from './Pages/Home';
import Movies from './Pages/Movies';
import TvShows from './Pages/TvShows';

const Container = styled.div`
  font-family: 'Raleway', sans-serif;
  font-weight: 600;
  font-size: 1.25rem;
  width: 100vw;
  height: auto;
  list-style-type: none;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
`;

const Menu = styled.nav`
  width: 100vw;
  height: 18vh;
  background-color: pink;
`;

const MenuList = styled.ul`
  height: 18vh;
  text-decoration: none;
  list-style-type: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;

export default class App extends Component{

  render(){
    return(
      <Container>
        <Router>
          <Menu>
            <MenuList>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="Movies">Filmes</Link>
              </li>
              <li>
                <Link to="TvShows">Séries</Link>
              </li>
            </MenuList>
          </Menu>

          <Routes>
            <Route path="/" element={<Home/>}>Home</Route>
            <Route path='Movies' element={<Movies/>}>Filmes</Route>
            <Route path="TvShows" element={<TvShows/>}>Séries</Route>
          </Routes>
        </Router>
      </Container>
    )
  };
};