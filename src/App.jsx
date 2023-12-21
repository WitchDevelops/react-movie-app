import { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import SearchIcon from './assets/search.svg';
import './assets/LoadingSpinner.css';
import './App.css';

// AOI key: 5c560c08
const API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=5c560c08";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const searchMovies = async (title) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}&s=${title}`);
      const data = await response.json();
      if (data.Response === 'True') {
        setMovies(data.Search);
      } else {
        setError(data.Error);
      }
    } catch (error) {
      setError('An error occured while fetching data')
    }
    setLoading(false);
  }
  useEffect(() => {
    searchMovies('The Lion King');
  }, []);

  return (
    <div className="app">
      <h1>MovieLand</h1>
      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value) }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              searchMovies(searchTerm)
            }
          }}
        >
        </input>
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => { searchMovies(searchTerm) }}
        />
      </div>

      {
        loading ? (
          <div className="loading-spinner"></div>
        ) : error ? (
          <div className="error">{error}</div>
        ) :
          movies?.length > 0 ? (
            <>
              <div>
                <p>Found {movies.length} movies for your '{searchTerm}' search</p>
              </div>
              <div className="container">
                {movies.map((movie, index) => (
                  <MovieCard movie={movie} key={index} />
                ))}
              </div>
            </>
          ) : (
            <div className="empty">
              <h2>No movies found</h2>
            </div>
          )
      }


    </div>
  )
}

export default App