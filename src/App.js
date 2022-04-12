import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Link,
  Routes,
  Route
} from 'react-router-dom';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

//importing components
import Home from './Pages/Home';
import Movies from './Pages/Movies';
import TvShows from './Pages/TvShows';

const GlobalStyle = createGlobalStyle`
  *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  body{
    background-color: #1D3557;
  }
`;

const Container = styled.div`
  font-family: 'Raleway', sans-serif;
  font-weight: 600;
  width: 100vw;
  height: auto;
  list-style-type: none;
`;

const Menu = styled.nav`
  height: 15vh;
  background-color: #E63946;
`;

const MenuList = styled.ul`
  font-size: 1.5em;
  height: 15vh;
  list-style-type: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #1D3557;
`;

export default class App extends Component{

  render(){
    return(
      <Container>
        <GlobalStyle/>
        <Router>
          <Menu>
            <MenuList>
              <li>
                <StyledLink to="/">Home</StyledLink>
              </li>
              <li>
                <StyledLink to="Movies">Filmes</StyledLink>
              </li>
              <li>
                <StyledLink to="TvShows">Séries</StyledLink>
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