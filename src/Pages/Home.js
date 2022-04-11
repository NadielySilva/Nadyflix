import React, { Component } from "react";
import axios from "axios";

import Carousel from "../Components/MainCarousel";

const apiMovies = axios.create({
  baseURL: "https://api.themoviedb.org/3/movie/popular?api_key=3bf0cb63f825fda304886553f468ea79&language=pt-BR&page=1"
});

const apiTvShows = axios.create({
  baseURL: "https://api.themoviedb.org/3/tv/popular?api_key=3bf0cb63f825fda304886553f468ea79&language=pt-BR&page=1"
});

export default class Home extends Component{

  state = {
    TvShowList: [],
    movieList: [],
  };

  async componentDidMount(){
    this.getTvShow();
  };

  async componentDidMount(){
    this.getMovies();
  };

  getTvShow = async() => {
    const response = await apiTvShows.get()
    //console.log(response.data.results)

    const TvShow = response.data.results.map((item) => {
      return{
        ...item,
        poster_path: `https://image.tmdb.org/t/p/w300/${item.poster_path}`
      }
    });

    this.setState({
      TvShowList: TvShow,
    });
  };

  getMovies = async() => {
    const response = await apiMovies.get()
    // console.log(response)

    const movies = response.data.results.map((item) => {
      return{
        ...item,
        poster_path: `https://image.tmdb.org/t/p/w300/${item.poster_path}`
      }
    });

    this.setState({
      movieList: movies,
    });
  };

  render(){
    return(
      <div>
        {/* <p>Séries</p>
        {this.state.TvShowList.map((item) => (
          <div>            
            <img src={item.poster_path}/>
          </div>
        ))} */}
        <p>Filmes</p>
        {this.state.movieList.map((item) => (
          <div>            
            <img src={item.poster_path}/>
          </div>
        ))}
      </div>
    )
  }
}