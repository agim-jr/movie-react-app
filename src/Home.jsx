import React, { useState } from 'react';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);

const handleSearch = async () => {
  if (!searchTerm) return;

  const response = await fetch(`http://www.omdbapi.com/?s=${searchTerm}&apikey=c31b6b59`);
  const data = await response.json();

  if (data.Search) {
    setMovies(data.Search);
    console.log(data.Search); // Check console to see the data
  }
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
          <p>Search for a movie to get started!</p>
        </div>
      </div>
    </div>
  );
}
