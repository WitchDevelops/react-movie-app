import { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import SearchIcon from './assets/search.svg';
import './assets/LoadingSpinner.css';
import './App.css';

const API_URL = "https://www.omdbapi.com/?i=tt3896198&apikey=5c560c08";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [totalMovies, setTotalMovies] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 9;

  const searchMovies = async (title, page) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}&s=${title}&page=${page}`);
      const data = await response.json();
      if (data.Response === 'True') {
        // setMovies(data.Search);
        setTotalMovies(Number(data.totalResults));
        setMovies(data.Search);
      } else {
        setError(data.Error);
      }
    } catch (error) {
      setError(`An error occured while fetching data: ${error.message}`);
    }
    setLoading(false);
  }
  useEffect(() => {
    searchMovies(searchTerm || 'The Lion King', currentPage);
  }, [searchTerm, currentPage]);



  const totalPages = Math.ceil(movies.length / moviesPerPage);

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
        <button
          className="search-button"
          onClick={() => { searchMovies(searchTerm) }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              searchMovies(searchTerm)
            }
          }}
        >
          <img
            src={SearchIcon}
            alt="search"
          />
        </button>

      </div>

      {
        loading ? (
          <div className="loading-spinner"></div>
        ) : error ? (
          <div className="error">{error}</div>
        ) :
          movies?.length > 0 ? (
            <>
              <div className="search-result__info">
                <p className="search-resutl__info-text">Found {totalMovies} {totalMovies === 1 ? 'movie' : 'movies'} for your '{searchTerm}' search</p>
              </div>
              <div className="container">
                {movies.slice(0, 9).map((movie, index) => (
                  <MovieCard movie={movie} key={index} />
                ))}
              </div>
              <div className="pagination">
                {Array.from({ length: Math.ceil(totalMovies / moviesPerPage) }, (_, i) => (
                  <button
                    key={i + 1}
                    className={currentPage === i + 1 ? 'active' : ''}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
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