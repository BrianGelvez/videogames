import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGenres, filterGamesByGenre } from '../../redux/actions';
import './Nav.modules.css';
import SearchBar from '../SearchBar/SearchBar';
import FilterGenre from '../FilterGenre/FilterGenre';
import  SortGames  from '../SortGames/SortGames';
import { Link } from 'react-router-dom';

const Nav = () => {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);

  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);

  const handleGenreChange = (event) => {
    const selectedGenre = event.target.value;
    dispatch(filterGamesByGenre(selectedGenre));
  };

  return (
    <div className="Nav">
            <Link to="/create">
        <button className='create-button'>Crear Videojuego</button>
      </Link>
      <SortGames/>
      <SearchBar />
      <FilterGenre genres={genres} handleGenreChange={handleGenreChange} />

    </div>
  );
};

export default Nav;
