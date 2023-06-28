import React from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { fetchGameById } from "../../redux/actions";
import "./Detail.modules.css";

const Detail = ({ game, fetchGameById }) => {
  const { id } = useParams();
  
  React.useEffect(() => {
    fetchGameById(id);
  }, [id, fetchGameById]);

  if (!game) {
    return <div>Loading...</div>;
  }

  const {
    name,
    genres,
    platforms,
    description,
    background_image,
    released,
    rating,
  } = game;

  return (
    <div className="Detail2">
      <div className="Detail">
        <h1>{name}</h1>
        {Array.isArray(genres) && <p>Genre: {genres.join(", ")}</p>}
        {platforms && <p>platforms: {platforms}</p>}
        {background_image && <img src={background_image} alt={name} />}
        {description && <p>Description: {description}</p>}
        <h2>Details:</h2>
        <ul>
          {game.id && <li>ID: {game.id}</li>}
          {released && <li>Released: {released}</li>}
          {rating && <li>Rating: {rating}</li>}
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    game: state.game,
  };
};

export default connect(mapStateToProps, { fetchGameById })(Detail);
