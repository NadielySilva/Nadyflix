import React, { Component } from "react";
import axios from "axios";

const apiMovies = axios.create({
  baseURL: "https://api.themoviedb.org/3/movie/popular?api_key=3bf0cb63f825fda304886553f468ea79&language=pt-BR&page=1"
});

export default class Home extends Component{

  state = {
    movieList: []
  };

  async componentDidMount(){
    const response = await apiMovies.get()
    console.log(response)

    const movies = response.data.results.map((item) => {
      return{
        ...item,
        poster_path: `https://image.tmdb.org/t/p/w300/${item.poster_path}`
      }
    });

    this.setState({
      movieList: movies
    });
  };

  render(){
    return(
      <div>
        <h1>Filmes Populares</h1>
        {this.state.movieList.map((item) =>(
          <div>
            <h2>{item.title}</h2>
            <p>{item.overview}</p>
            <img src={item.poster_path} alt={`Banner ${item.title}`}/>
          </div>
        ))}
      </div>
    )
  }

}