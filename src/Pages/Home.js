import React, { Component } from "react";
import axios from "axios";
import styled from 'styled-components';

//importing components
import Carousel, { CarouselItem } from "../Components/MainCarousel";
import Footer from "../Components/Footer";


const Container = styled.div`
  font-family: 'Raleway', sans-serif;
  font-weight: 600;
  color: #F1FAEE;
`;

const SubContainer = styled.div`
  font-family: 'Raleway', sans-serif;
  font-size: 2.75rem;
  font-weight: 600;
  color: #F1FAEE;
  margin: 12px;
`;

const Poster = styled.img`
  width: auto;
  height: 85%;
  border-radius: 18px;

  &:hover{
    cursor: pointer;
  }
`;

const apiMovies = axios.create({
  baseURL: "https://api.themoviedb.org/3/movie/popular?api_key=3bf0cb63f825fda304886553f468ea79&language=pt-BR&page=1"
});

const apiTvShows = axios.create({
  baseURL: "https://api.themoviedb.org/3/tv/popular?api_key=3bf0cb63f825fda304886553f468ea79&language=pt-BR&page=1"
});

export default class Home extends Component{

  state = {
    TvShowList: [],
    movieList: []
  };

  async componentDidMount(){
    this.getTvShow();
    this.getMovies();
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
      TvShowList: TvShow
    });
  }

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
      <Container>
        <SubContainer>
          <p>Filmes Populares</p>
          <Carousel >
            {this.state.movieList.map((item) => (
              <CarouselItem>
                <Poster src={item.poster_path}/>
              </CarouselItem>
            ))}
          </Carousel>
          <p>Séries Populares</p>
          <Carousel >
            {this.state.TvShowList.map((item) => (
              <CarouselItem>
                <Poster src={item.poster_path}/>
              </CarouselItem>
            ))}
          </Carousel>
        </SubContainer>
        <Footer/>
      </Container>
    )
  }
}