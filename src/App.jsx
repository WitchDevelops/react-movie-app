import { useEffect } from 'react';
import MovieCard from './MovieCard';
import SearchIcon from './assets/search.svg';
import './App.css';

// AOI key: 5c560c08

const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=5c560c08';

const movie1 = {
  
    "Title": "The Lion King",
    "Year": "1994",
    "imdbID": "tt0110357",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BYTYxNGMyZTYtMjE3MS00MzNjLWFjNmYtMDk3N2FmM2JiM2M1XkEyXkFqcGdeQXVyNjY5NDU4NzI@._V1_SX300.jpg"

}
const App = () => {
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    console.log(data.Search);

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
      <div className="container">
        <MovieCard movie={movie1}/>
      </div>
    </div>
  )
}

export default App