import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMovieDetails = useCallback(async () => {
    setLoading(true);
    const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=c31b6b59`);
    const data = await response.json();

    await new Promise(resolve => setTimeout(resolve, 800));

    if (data.Response === "True") {
      setMovie(data);
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchMovieDetails();
  }, [fetchMovieDetails]);

  if (loading) {
    return (
      <div className="movie-details-container">
        <div className="movie-details-skeleton">
          <div className="skeleton-backdrop"></div>
          <div className="skeleton-details">
            <div className="skeleton-text large"></div>
            <div className="skeleton-text medium"></div>
            <div className="skeleton-text small"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="container">
        <h1>Movie not found</h1>
        <button onClick={() => navigate('/')}>Go Back Home</button>
      </div>
    );
  }

  const poster = movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Poster";

  return (
    <div className="movie-details-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="movie-details-hero" style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(20,20,20,1)), url(${poster})`,
      }}>
        <div className="movie-details-content">
          <div className="movie-poster">
            <img src={poster} alt={movie.Title} />
          </div>

          <div className="movie-info">
            <h1>{movie.Title}</h1>

            <div className="movie-meta">
              <span className="rating">{movie.imdbRating}/10</span>
              <span>{movie.Year}</span>
              <span>{movie.Rated}</span>
              <span>{movie.Runtime}</span>
            </div>

            <p className="movie-plot">{movie.Plot}</p>

            <div className="movie-details-grid">
              <div className="detail-item">
                <strong>Genre:</strong> {movie.Genre}
              </div>
              <div className="detail-item">
                <strong>Director:</strong> {movie.Director}
              </div>
              <div className="detail-item">
                <strong>Cast:</strong> {movie.Actors}
              </div>
              <div className="detail-item">
                <strong>Writer:</strong> {movie.Writer}
              </div>
              <div className="detail-item">
                <strong>Language:</strong> {movie.Language}
              </div>
              <div className="detail-item">
                <strong>Awards:</strong> {movie.Awards}
              </div>
            </div>

            {movie.Ratings && movie.Ratings.length > 0 && (
              <div className="movie-ratings">
                <h3>Ratings</h3>
                <div className="ratings-list">
                  {movie.Ratings.map((rating, index) => (
                    <div key={index} className="rating-item">
                      <span className="rating-source">{rating.Source}</span>
                      <span className="rating-value">{rating.Value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
