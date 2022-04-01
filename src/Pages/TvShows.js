import React, { Component } from "react";
import axios from "axios";

const apiTvShows = axios.create({
  baseURL: "https://api.themoviedb.org/3/tv/popular?api_key=3bf0cb63f825fda304886553f468ea79&language=pt-BR&page=1"
});

export default class TvShows extends Component{

  state = {
    TvShowList: []
  };

  async componentDidMount(){
    const response = await apiTvShows.get()
    console.log(response)

    const TvShows = response.data.results.map((item) => {
      return{
        ...item,
        poster_path: `https://image.tmdb.org/t/p/w300/${item.poster_path}`
      }
    });

    this.setState({
      TvShowList: TvShows
    });
  };

  render(){
    return(
      <div>
        <h2>Seriados</h2>
        {this.state.TvShowList.map((item) =>(
          <div>
            <h2>{item.title}</h2>
            <img src={item.poster_path} alt={`Banner ${item.title}`}/>
            <p><strong>Resumo: </strong>{item.overview}</p>
            <p><strong>Avaliação: </strong>{item.vote_average}/10.0</p>
          </div>
        ))}
      </div>
    )
  }

}