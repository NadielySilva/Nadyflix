import React, { Component } from 'react';
import axios from 'axios';

//importing components
import Header from './components/Header';
import Home from './components/Home';
import Movies from './components/Movies';
import TvShows from './components/TvShows';
import Footer from './components/Footer';

export default class App extends Component{

  render(){
    return(
      <>
      <Header/>
      <Home/>
      <Movies/>
      <TvShows/>
      <Footer/>
      </>
    )
  };
};