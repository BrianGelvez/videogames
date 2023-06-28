import React from 'react';
import './FilterGenre.modules.css';

const FilterGenre = ({ genres, handleGenreChange }) => {
  return (
    <div className="filter-container">
      <label htmlFor="genreSelect" className="filter-label">Filter by gender:  </label>
      <select id="genreSelect" className="filter-select" onChange={handleGenreChange}>
        <option value="">Todos</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.name}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterGenre;
