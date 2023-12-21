import { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import SearchIcon from './assets/search.svg';
import './App.css';

// AOI key: 5c560c08

const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=5c560c08';

const App = () => {
  const [movies, setMovies] = useState([]);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    // console.log(data.Search);
    setMovies(data.Search);
  }
  useEffect(() => {
    searchMovies('Lion King');
  }, []);

  return (
    <div className="app">
      <h1>MovieLand</h1>
      <div className="search">
        <input
          placeholder="Search for movies"
          value="The Lion King"
          onChange={() => { }} // TODO
        >
        </input>
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => { }} // TODO
        />
      </div>

      {
        movies?.length > 0
          ? (
            <div className="container">
              {movies.map((movie, index) => (
                <MovieCard movie={movie} key={index}/>
              ))}
            </div>
          ) :
          (
            <div className="empty">
              <h2>No movies found</h2>
            </div>
          )
      }


    </div>
  )
}

export default App