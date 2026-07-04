import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import SkeletonCard from './SkeletonCard';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [sortOption, setSortOption] = useState('default');

  // Fetch default movies on page load
  useEffect(() => {
    fetchMovies('popular');
  }, []);

  // Apply sorting whenever movies or sortOption changes
  useEffect(() => {
    sortMovies(sortOption);
  }, [movies, sortOption]);

  const fetchMovies = async (query) => {
    setLoading(true);
    const response = await fetch(`http://www.omdbapi.com/?s=${query}&apikey=c31b6b59`);
    const data = await response.json();

    // Add minimum delay so skeleton is visible
    await new Promise(resolve => setTimeout(resolve, 800));

    if (data.Search) {
      setMovies(data.Search.slice(0, 6));
    }
    setLoading(false);
  };

  const sortMovies = (option) => {
    let sorted = [...movies];

    switch(option) {
      case 'a-z':
        sorted.sort((a, b) => a.Title.localeCompare(b.Title));
        break;
      case 'z-a':
        sorted.sort((a, b) => b.Title.localeCompare(a.Title));
        break;
      case 'newest':
        sorted.sort((a, b) => parseInt(b.Year) - parseInt(a.Year));
        break;
      case 'oldest':
        sorted.sort((a, b) => parseInt(a.Year) - parseInt(b.Year));
        break;
      default:
        // Keep original order
        break;
    }

    setFilteredMovies(sorted);
  };

  const handleSearch = async () => {
    if (!searchTerm) return;
    fetchMovies(searchTerm);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
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

      <div className="filter-section">
        <label htmlFor="sort-filter">Sort by:</label>
        <select id="sort-filter" value={sortOption} onChange={handleSortChange}>
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
          ) : filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
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
