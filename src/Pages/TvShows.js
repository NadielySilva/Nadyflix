import React, { Component } from "react";
import axios from "axios";

const apiTvShows = axios.create({
  baseURL: "https://api.themoviedb.org/3/tv/popular?api_key=3bf0cb63f825fda304886553f468ea79&language=pt-BR&page=1"
});

export default class TvShows extends Component{

  state = {
    TvShowList: [],
    filteredTvShow: []
  };

  async componentDidMount(){
    this.getTvShow();
  };

  getTvShow = async() => {
    const response = await apiTvShows.get()
    // console.log(response)

    const TvShow = response.data.results.map((item) => {
      return{
        ...item,
        poster_path: `https://image.tmdb.org/t/p/w300/${item.poster_path}`
      }
    });

    this.setState({
      movieList: TvShow,
      filteredTvShow: TvShow
    });
  }

  TvShowFilter = (event) => {
    const { movieList } = this.state;

    if (event.target.value === ""){
      this.setState({
        filteredTvShow: movieList
      });
      return;
    };

    const convertedFilteredTvShow = movieList.filter((item) => {
      if (item.name.toLowerCase().includes(event.target.value.toLowerCase())){
        return true;
      }

      const noTvShow = () => {
        if(!!item.name){
          return;
          <p>hum... Ainda não temos esse filme no nosso catálogo</p>
        }
      };
    });

    this.setState({
      filteredTvShow: convertedFilteredTvShow
    });
  }

  render(){
    return(
      <div>
        <input type="text"
        placeholder="Digite o nome do filme"
        onChange={this.TvShowFilter}
        />
        <h1>Séries Populares</h1>
        <ul>
          {this.state.filteredTvShow.map((item) => (
            <li 
            key={item.id}>
              <h2>{item.name}</h2>
              <img src={item.poster_path}/>
              <p>{item.vote_average}/10.0</p>
            </li>
          ))}
        </ul>
      </div>
    )
  }

}