import React, { useEffect, useState } from "react";
import MovieList from "./MovieList";

export default function Home() {
  const [data, setData] = useState([]);

  

  async function getTrendingMovies() {
    const url = process.env.REACT_APP_MOVIES_URL;
    const response = await fetch(`${url}/trending`);
    const TrendingMovies = await response.json();
    setData(TrendingMovies);   
  }

  useEffect(() => {
    getTrendingMovies();
  }, []);

  return <MovieList data={data} />;
}
