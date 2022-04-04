import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";

const Container = styled.div`
  font-family: 'Raleway', sans-serif;
  color: #001219;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
`;

const SearchBox = styled.label`
  color: #94D2BD;
  width: 65vw;
  height: 10vh;
  display: block;
  border: 1px solid #94D2BD;
  border-radius: 5px 5px;
  border-focus: #94D2BD;
  margin: 0;
  padding: 0;
  background-color: #005F73;
`;

const Search = styled.input`
  color: #005F73;
  placeholder: #005F73;
  width: 30vw;
  height: 9.5vh;
  border: none;
  border-radius: 5px 5px;
  border-focus: #94D2BD;
  margin: 0;
  padding: 0;
  background-color: #94D2BD;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 600;
`;

const Title2 = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
`;

const Poster = styled.img`
  width: auto;
  height: 50vh;
  object-fit: cover;
  border-radius: 3vh 2.5vw;

  &:hover{
    width: auto;
    height: 55vh;
    cursor: pointer;
  }
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
  border-radius: 4%;
  padding: 3%;
  margin: 2%;
  background-color: pink;
`;

const ListTextBox = styled.div`
  width: 80vw;
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-left: 2vw;
`;

const Rating = styled.p`
  width: 15vw;
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: green;
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
        placeholder="Digite aqui"
        onChange={this.TvShowFilter}
        /></SearchBox>
        <Title>Séries Populares</Title>
        <ListBox>
          {this.state.filteredTvShow.map((item) => (
            <StyledList 
            key={item.id}>
              <Poster src={item.poster_path}/>
              <ListTextBox>
                <Title2>{item.name}</Title2>
                <Rating>{item.vote_average}/10.0</Rating>
              </ListTextBox>
            </StyledList>
          ))}
        </ListBox>
      </Container>
    )
  }

}