import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import SkeletonCard from './SkeletonCard';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState('default');

  useEffect(() => {
    const fetchDefaultMovies = async () => {
      setLoading(true);
      const response = await fetch(`http://www.omdbapi.com/?s=popular&apikey=c31b6b59`);
      const data = await response.json();
      await new Promise(resolve => setTimeout(resolve, 800));
      if (data.Search) {
        setMovies(data.Search.slice(0, 6));
      }
      setLoading(false);
    };
    fetchDefaultMovies();
  }, []);

  const handleSearch = async () => {
    if (!searchTerm) return;
    setLoading(true);
    const response = await fetch(`http://www.omdbapi.com/?s=${searchTerm}&apikey=c31b6b59`);
    const data = await response.json();
    await new Promise(resolve => setTimeout(resolve, 800));
    if (data.Search) {
      setMovies(data.Search.slice(0, 6));
    }
    setLoading(false);
  };

  const sortedMovies = [...movies].sort((a, b) => {
    switch(sortOption) {
      case 'a-z': return a.Title.localeCompare(b.Title);
      case 'z-a': return b.Title.localeCompare(a.Title);
      case 'newest': return parseInt(b.Year) - parseInt(a.Year);
      case 'oldest': return parseInt(a.Year) - parseInt(b.Year);
      default: return 0;
    }
  });

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
        <select id="sort-filter" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
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
          ) : sortedMovies.length > 0 ? (
            sortedMovies.map((movie) => <MovieCard key={movie.imdbID} movie={movie} />)
          ) : (
            <p>No movies found. Try searching for something else!</p>
          )}
        </div>
      </div>
    </div>
  );
}
