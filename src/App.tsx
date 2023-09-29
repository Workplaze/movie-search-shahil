import React, { useEffect, useState } from "react";
import "./App.css";
import PrimarySearchAppBar from "./Components/Navbar";
import axios from "axios";
import Home from "./Components/Home";
import { Box } from "@mui/material";
import UseChangeMode from "./CustomHooks/UseChangeMode";
import { TVShow } from "./utils";

function App() {
  const [mode, toggleHandler] = UseChangeMode();

  const [moviesData, setmoviesData] = useState<TVShow[] | []>([]);
  const [defaultMoviesData, setDefaultMoviesData] = useState<TVShow[] | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filterMoviesData = (userSearchInput: string): void => {
    let searchedMovies = defaultMoviesData.filter((movies) =>
      movies.name.toLowerCase().includes(userSearchInput.toLowerCase())
    );
    if (searchedMovies.length > 0 && userSearchInput.length > 0) {
      setmoviesData(searchedMovies);
    } else if (userSearchInput.length == 0) {
      setmoviesData(defaultMoviesData);
    } else {
      setmoviesData([]);
    }
    scrollToTop();
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://api.tvmaze.com/shows")
      .then((response) => {
        setmoviesData(response?.data);
        setDefaultMoviesData(response?.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() =>{
        setTimeout(() => {
          setIsLoading(false)
        }, 1000);
      } );
  }, []);

  return (
    <Box sx={{ backgroundColor: mode ? "black" : "white" }}>
      <PrimarySearchAppBar
        filterMoviesData={filterMoviesData}
        mode={mode}
        toggleHandler={toggleHandler}
      />
      <Home moviesData={moviesData} isLoading={isLoading} />
    </Box>
  );
}

export default App;
