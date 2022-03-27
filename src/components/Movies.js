import React, { Component } from "react";
import axios from "axios";

const apiLatestMovies = axios.create({
  baseURL: "https://api.themoviedb.org/3/movie/upcoming?api_key=3bf0cb63f825fda304886553f468ea79&language=en-US&page=1"
});

export default class Movies extends Component{

  state = {
    latestMovieList: []
  };

  async componentDidMount(){
    const response = await apiLatestMovies.get()
    console.log(response)

    const latestMovies = response.data.results.map((item) => {
      return{
        ...item,
        poster_path: `https://image.tmdb.org/t/p/w300/${item.poster_path}`
      }
    });

    this.setState({
      latestMovieList: latestMovies
    });
  };

  render(){
    return(
      <div>
        <h2>Em breve</h2>
        {this.state.latestMovieList.map((item) =>(
          <div>
            <h2>{item.title}</h2>
            <img src={item.poster_path} alt={`Banner ${item.title}`}/>
            <p><strong>Título Original: {item.original_title}</strong></p>
            <p><strong>Lançamento: </strong>{item.release_date}</p>
          </div>
        ))}
      </div>
    )
  }

}