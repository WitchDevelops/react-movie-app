import { useEffect } from 'react';
import SearchIcon from './assets/search.svg';
import './App.css';

// AOI key: 5c560c08

const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=5c560c08';
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
          value="Lion King"
          onChange={() => {}} // TODO
        >
        </input>
        <img 
          src={SearchIcon} 
          alt="search"
          onClick={() => {}} // TODO
        />
      </div>
    </div>
  )
}

export default App