import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import SkeletonCard from './SkeletonCard';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch default movies on page load
  useEffect(() => {
    fetchMovies('popular'); // You can change this to any default search term
  }, []);

  const fetchMovies = async (query) => {
    setLoading(true);
    const response = await fetch(`http://www.omdbapi.com/?s=${query}&apikey=c31b6b59`);
    const data = await response.json();

    if (data.Search) {
      setMovies(data.Search.slice(0, 6)); // Get only first 6 movies
    }
    setLoading(false);
  };

  const handleSearch = async () => {
    if (!searchTerm) return;
    fetchMovies(searchTerm);
  };

  return (
    <div className="container">
      <div className="search-section">
        <h1>America's most awarded winning movies</h1>
        <input
          type="text"
          placeholder="Search for a movie..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="filter-section" style={{ display: 'none' }}>
        <label htmlFor="sort-filter">Sort by:</label>
        <select id="sort-filter">
          <option value="default">Default</option>
          <option value="a-z">Alphabetical A to Z</option>
          <option value="z-a">Alphabetical Z to A</option>
          <option value="newest">Newest to Oldest</option>
          <option value="oldest">Oldest to Newest</option>
        </select>
      </div>

      <div className="row">
        <div className="movie-list">
          {loading ? (
            Array(6).fill(0).map((_, index) => <SkeletonCard key={index} />)
          ) : movies.length > 0 ? (
            movies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))
          ) : (
            <p>No movies found. Try searching for something else!</p>
          )}
        </div>
      </div>
    </div>
  );
}
