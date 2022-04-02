import React, { Component } from "react";
import axios from "axios";


const apiMovies = axios.create({
  baseURL: "https://api.themoviedb.org/3/movie/popular?api_key=3bf0cb63f825fda304886553f468ea79&language=pt-BR&page=1"
});

export default class Movies extends Component{

  state = {
    movieList: [],
    filteredMovies: []
  };

  async componentDidMount(){
    this.getMovies();
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
      filteredMovies: movies
    });
  }

  moviesFilter = (event) => {
    const { movieList } = this.state;

    if (event.target.value === ""){
      this.setState({
        filteredMovies: movieList
      });
      return;
    };

    const convertedFilteredMovies = movieList.filter((item) => {
      if (item.title.toLowerCase().includes(event.target.value.toLowerCase())){
        return true;
      }

      const noMovies = () => {
        if(!!item.title){
          return;
          <p>hum... Ainda não temos esse filme no nosso catálogo</p>
        }
      };
    });

    this.setState({
      filteredMovies: convertedFilteredMovies
    });
  }

  render(){
    return(
      <div>
        <input type="text"
        placeholder="Digite o nome do filme"
        onChange={this.moviesFilter}
        />
        <h1>Filmes Populares</h1>
        <ul>
          {this.state.filteredMovies.map((item) => (
            <li 
            key={item.id}>
              <h2>{item.title}</h2>
              <img src={item.poster_path}/>
              <p>{item.vote_average}/10.0</p>
            </li>
          ))}
        </ul>
      </div>
    )
  }

};