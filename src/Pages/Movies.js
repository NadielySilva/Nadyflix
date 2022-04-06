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
  font-size: 1.25em;
  font-weight: 600;
  color: #A8DADC;
  letter-spacing: 1px;
  width: 40vw;
  height: 10vh;
  display: block;
  position: relative;
  left: 55vw;
  border: 1px solid #94D2BD;
  border-radius: 5px 5px;
  margin: 0;
  padding: 0.5%;
  background-color: #1d3557;
`;

const Search = styled.input`
  font-size: 1.15em;
  color: #1d3557;
  letter-spacing: 1px;
  placeholder: #457B9D;
  width: 50%;
  height: 95%;
  border: none;
  border-radius: 5px 5px;
  margin: 0.5%;
  padding: 0;
  background-color: #A8DADC;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 600;
`;

const MovieName = styled.h2`
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
  background-color: #A8DADC;
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
  font-weight: 600;
  width: 15%;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background-color: #E63946;
`;


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
      <Container>
        <SearchBox>O que quer assistir hoje?: <Search type="text"
        placeholder="Digite o nome do filme"
        onChange={this.moviesFilter}
        /></SearchBox>
        <Title>Filmes Populares</Title>
        <ListBox>
          {this.state.filteredMovies.map((item) => (
            <StyledList 
            key={item.id}>
              <Poster src={item.poster_path}/>
              <ListTextBox>
                <MovieName>{item.title}</MovieName>   
                <Rating>{item.vote_average}/10.0</Rating>
                <p>{item.overview}</p>
              </ListTextBox>
            </StyledList>
          ))}
        </ListBox>
      </Container>
    )
  }

};