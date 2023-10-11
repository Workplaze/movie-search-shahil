import React, { useEffect, useState} from "react";
import { MyProvider } from "./FilterUsers";
import "./App.css";
import PrimarySearchAppBar from "./Components/Navbar/Navbar";
import axios from "axios";
import Home from "./Components/Home/Home";
import { Box } from "@mui/material";
import UseChangeMode from "./CustomHooks/UseChangeMode";
import { TVShow } from "./utils";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";
import Users from "./Components/Users/Users";
import { Toaster } from "react-hot-toast";

const createApolloClient = (authToken: string) => {
  return new ApolloClient({
    link: new HttpLink({
      uri: "https://exact-cat-49.hasura.app/v1/graphql",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "x-hasura-admin-secret": authToken, // or 'x-hasura-access-key' depending on your setup
      },
    }),
    cache: new InMemoryCache(),
  });
};

function App() {
  const token: string =
    "wuTIuxNgFGxP3naQp7aN9vDjTIAbK3eXThkVMh5KioL55tLsVgxXQ8ZX0Wz8RX0f";
  const [client] = useState(() => createApolloClient(token));
  const [mode, toggleHandler] = UseChangeMode();
  const [moviesData, setmoviesData] = useState<TVShow[]>([]);
  const [defaultMoviesData, setDefaultMoviesData] = useState<TVShow[]>([]);
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
    } else if (userSearchInput.length === 0) {
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
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      });
  }, []);

  return (
    <MyProvider>
      <ApolloProvider client={client}>
        <Toaster />
        <Router>
          <Box sx={{ backgroundColor: mode ? "black" : "white" }}>
            <PrimarySearchAppBar /**its a navbar */
              filterMoviesData={filterMoviesData}
              mode={mode}
              toggleHandler={toggleHandler}
            />
            <Routes>
              <Route
                path="/"
                element={<Home moviesData={moviesData} isLoading={isLoading} />}
              />
              <Route path="/users" element={<Users />} />
            </Routes>
          </Box>
        </Router>
      </ApolloProvider>
    </MyProvider>
  );
}

export default App;
