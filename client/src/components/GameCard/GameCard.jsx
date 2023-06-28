import React from "react";
import "./Gamecard.modules.css";
import { Link } from 'react-router-dom';

const GameCard = ({ image, name, genres, id }) => {
  return (
    <div className="GameCard2">
      <div className="GameCard">
        <img src={image} alt={name} />
        <Link to={`/${id}`}>
          <h2>{name}</h2>
        </Link>
        <p>Genres: {genres.join(", ")}</p>
      </div>
    </div>
  );
};

export default GameCard;
