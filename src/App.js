import { ReactTyped } from "react-typed";
import React from "react";

import { useEffect, useState } from "react";
import "./App.css";
import MovieCard from "./MovieCard";
const API_URL = "https://www.omdbapi.com?apikey=680a7cf7";

function App() {
  const [movies, setMovies] = useState([]);
  const [isloading, setIsloading] = useState(true);
  const [search, setSearch] = useState("");

  const SearchMovie = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    if (!response.ok) throw new Error("fail to fetch");
    const data = await response.json();
    setMovies(data.Search);
  };
  useEffect(() => {
    SearchMovie("batman");
  }, []);
  return (
    <div className="app">
      <h1>MasterMind</h1>{" "}
      <div className="search">
        <input
          type="text"
          placeholder="Search for Movies"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <img
          src="https://img.icons8.com/ios-filled/50/f9d3ba/search.png"
          alt="search"
          onClick={() => SearchMovie(search)}
        />
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <div className=" container ">
          <h2 className=" empty">Movie Not Found</h2>
        </div>
      )}
    </div>
  );
}

export default App;
