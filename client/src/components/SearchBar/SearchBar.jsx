import React, { useState } from "react";
import './SearchBar.modules.css'
import { useDispatch } from "react-redux";
import { searchGames } from "../../redux/actions";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchGames(searchTerm));
  };

  return (
    <div className="SearchBar">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Buscar juegos..."
          value={searchTerm}
          onChange={handleChange}
        />
        <button type="submit">Buscar</button>
      </form>
    </div>
  );
};

export default SearchBar;
