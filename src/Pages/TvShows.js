import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";

const Container = styled.div`
  font-family: 'Raleway', sans-serif;
  color: #1d3557;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
`;

const SearchBox = styled.label`
  font-weight: 600;
  color: #A8DADC;
  letter-spacing: 1px;
  width: 44vw;
  height: 8vh;
  display: block;
  position: relative;
  left: 52%;
  border-radius: 10px 10px;
  margin: 0;
  padding: 5px;
  background-color: #1d3557;
`;

const Search = styled.input`
  color: #1d3557;
  letter-spacing: 1px;
  placeholder: #457B9D;
  width: 50%;
  height: 95%;
  border: none;
  border-radius: 0px 10px 10px 0px;
  background-color: #A8DADC;
`;

const Title = styled.h2`
  font-size: 2.75rem;
  font-weight: 600;
`;

const ListBox = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledList = styled.li`
  width: 84vw;
  height: 55vh;
  display: flex;
  align-items: center;
  border-radius: 18px;
  padding: 24px;
  margin: 12px;
  background-color: #A8DADC;
`;

const TvShowName = styled.h2`
  font-size: 2rem;
  font-weight: 600;
`;

const PosterBox = styled.div`
  width: 25%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Poster = styled.img`
  width: auto;
  height: 98%;
  object-fit: cover;
  border-radius: 12px 12px;

  &:hover{
    width: auto;
    height: 100%;
    cursor: pointer;
  }
`;

const ListTextBox = styled.div`
  width: 75%;
  height: 95%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 12px;
  margin: 18px;
`;

const Rating = styled.p`
  font-size: 1.25rem;
  font-weight: 600;
  width: 15%;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background-color: #E63946;
`;

const Overview = styled.p`
  font-size: 1rem;
  font-weight: 500;
  text-align: justify;
  width: 95%;
  height: 40%;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
  }
`;

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
      <Container>
        <SearchBox>O que quer assistir hoje?: <Search type="text"
        placeholder="Digite o nome da série"
        onChange={this.TvShowFilter}
        /></SearchBox>
        <Title>Séries Populares</Title>
        <ListBox>
          {this.state.filteredTvShow.map((item) => (
            <StyledList 
            key={item.id}>
              <PosterBox>
                <Poster src={item.poster_path}/>
              </PosterBox>
              <ListTextBox>
                <TvShowName>{item.name}</TvShowName>
                <Rating>{item.vote_average}/10.0</Rating>
                <Overview>{item.overview}</Overview>
              </ListTextBox>
            </StyledList>
          ))}
        </ListBox>
      </Container>
    )
  }

}