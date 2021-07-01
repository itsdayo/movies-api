import React, { useEffect, useState } from "react";
import logo from "../images/logo.svg";
import styled from "styled-components";

import axios from "axios";
import {
  REACT_APP_MOVIE_DB_API_KEY,
  REACT_APP_API_BASE_IMAGE_URL,
  REACT_APP_API_DOMAIN,
} from "./../components/env";

import Modal from "./Modal";

const HeaderContainer = styled.div`
  justify-content: space-between;
  display: flex;
`;

const SearchInput = styled.input`
  align-self: center;
  border: 2px solid #c0c0c0;
  position: relative;
  height: 25px;
  width: 160px;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: #c0c0c0;
  }
`;

const HorizontalLine = styled.hr`
  border: 0.5px solid #c0c0c0;
`;

const MovieCard = styled.div`
  width: 230px;
  height: 350px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  margin-bottom: 20px;
  border-radius: 5px;
  float: left;
  padding-bottom: 10px;
`;
const MovieImg = styled.img`
  border-radius: 5px;
`;

const MovieTitle = styled.p`
  text-align: center;
`;

const MovieVoterAverage = styled.span`
  position: absolute;
  border-radius: 100px;
  border: 2px solid black;
  background-color: white;
  text-align: center;
  height: 20px;
  width: 20px;
  padding: 5px;
  margin-left: 5px;
  margin-top: 5px;
`;

const PageContent = styled.div``;
const MoviesPage = styled.div`
  margin-left: 75px;
  margin-right: 75px;
`;

const App = () => {
  const [movies, setMovies] = useState([]);
  const [showModalBool, setShowModalBool] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState();

  useEffect(() => {
    async function fetchData() {
      let recentMovies = [];
      const movieResponse = await axios.get(
        `${REACT_APP_API_DOMAIN}?api_key=${REACT_APP_MOVIE_DB_API_KEY}`
      );

      const movieResults = movieResponse.data.results;
      for (const i in movieResults) {
        let id = movieResults[i].id;
        let title = movieResults[i].title;
        let releaseDate = movieResults[i]["release_date"];
        let voteAverage = movieResults[i]["vote_average"];
        let voteCount = movieResults[i]["vote_count"];
        let overview = movieResults[i].overview;

        const imgaeResponse = await axios.get(
          `${REACT_APP_API_BASE_IMAGE_URL}${movieResults[i]["poster_path"]}`
        );

        let imagePath = imgaeResponse.config.url;

        recentMovies.push({
          id,
          title,
          releaseDate,
          voteAverage,
          voteCount,
          overview,
          imagePath,
        });
      }

      setMovies(recentMovies);
    }

    fetchData();
  }, []);

  const searchForMovies = async (e) => {
    let recentMovies = [];
    const movieResponse = await axios.get(
      `${REACT_APP_API_DOMAIN}?api_key=${REACT_APP_MOVIE_DB_API_KEY}`
    );

    const movieResults = movieResponse.data.results;
    for (const i in movieResults) {
      let id = movieResults[i].id;
      let title = movieResults[i].title;
      let releaseDate = movieResults[i]["release_date"];
      let voteAverage = movieResults[i]["vote_average"];
      let voteCount = movieResults[i]["vote_count"];
      let overview = movieResults[i].overview;

      const imgaeResponse = await axios.get(
        `${REACT_APP_API_BASE_IMAGE_URL}${movieResults[i]["poster_path"]}`
      );

      let imagePath = imgaeResponse.config.url;

      recentMovies.push({
        id,
        title,
        releaseDate,
        voteAverage,
        voteCount,
        overview,
        imagePath,
      });
    }

    const queriedMovies = recentMovies.filter((movie) =>
      movie.title.toUpperCase().includes(e.target.value.toUpperCase())
    );

    setMovies(queriedMovies);
  };

  const selectMovie = (movie) => {
    setSelectedMovie(movie);

    document.body.style =
      " background:linear-gradient(rgba(0, 0, 0, .5), rgba(0, 0, 0, .5))";

    setShowModalBool(true);
  };

  const closeModal = () => {
    document.body.style = null;
    setShowModalBool(false);
  };
  const changeColorOnModal = {
    background: "brightness(50%)",
  };

  return (
    <MoviesPage>
      <Modal
        closeModal={closeModal}
        showModal={showModalBool}
        selectedMovie={selectedMovie}
      />
      <PageContent>
        <HeaderContainer>
          <img
            style={{
              filter: showModalBool ? changeColorOnModal.background : null,
            }}
           
            src={logo}
            alt="Timescale"
          />

          <SearchInput
            
            placeholder="Search for a movie"
            type="text"
            name="name"
            style={{
              filter: showModalBool ? changeColorOnModal.background : null,
            }}
            onChange={(e) => {
              searchForMovies(e);
            }}
          />
        </HeaderContainer>

        <HorizontalLine
          style={{
            filter: showModalBool ? changeColorOnModal.background : null,
          }}
        />

      
        <div>
          <h3>Most Recent Movies</h3>
          <div>
            {movies.map((movie, i) => (
              <MovieCard
               
                key={movie.id}
                style={{
                  marginLeft: (i - 1) % 4 === 0 || (i - 2) % 4 === 0 ? 65.5 : 0,
                  marginRight: (i - 2) % 4 === 0 ? 65.5 : 0,

                  filter: showModalBool ? changeColorOnModal.background : null,
                }}
                onClick={() => selectMovie(movie)}
              >
                <MovieVoterAverage>{movie.voteAverage}</MovieVoterAverage>
                <MovieImg
                  src={movie.imagePath}
                  width={230}
                  height={300}
                  alt="movie cannot display"
                />
                <div>
                  <MovieTitle>{movie.title}</MovieTitle>
                </div>
              </MovieCard>
            ))}
          </div>
        </div>
      </PageContent>
    </MoviesPage>
  );
};

export default App;
