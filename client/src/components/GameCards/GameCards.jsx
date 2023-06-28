import React from 'react';
import { connect } from 'react-redux';
import GameCard from '../GameCard/GameCard';
import './GameCards.modules.css';

const GameCards = ({ games }) => {
  
  return (
    <div className="cardsContainer">
      {games.map((game) => (
        <GameCard
          key={game.id}
          id={game.id}
          image={game.background_image}
          name={game.name}
          genres={game.genres.map((genre) => genre.name)}
        />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    games: state.filteredGames.length ? state.filteredGames : state.games,
  };
};

export default connect(mapStateToProps)(GameCards);
