import axios from 'axios';


export const fetchAllGamesRequest = () => {
    return {
      type: 'FETCH_ALL_GAMES_REQUEST',
    };
  };
  
  export const fetchAllGamesSuccess = (games) => {
    return {
      type: 'FETCH_ALL_GAMES_SUCCESS',
      payload: games,
    };
  };
  
  export const fetchAllGamesFailure = (error) => {
    return {
      type: 'FETCH_ALL_GAMES_FAILURE',
      payload: error,
    };
  };

  export const sortGamesAscending = () => {
    return {
      type: 'SORT_GAMES_ASCENDING',
    };
  };
  
  export const sortGamesDescending = () => {
    return {
      type: 'SORT_GAMES_DESCENDING',
    };
  };

  export const filterGamesByRatingAscending = () => {
    return {
      type: 'FILTER_GAMES_BY_RATING_ASCENDING'
    };
  };
  
  export const filterGamesByRatingDescending = () => {
    return {
      type: 'FILTER_GAMES_BY_RATING_DESCENDING'
    };
  };

  export const searchGamesRequest = () => {
    return {
      type: 'SEARCH_GAMES_REQUEST',
    };
  };

  export const searchGamesSuccess = (games) => {
    return {
      type: 'SEARCH_GAMES_SUCCESS',
      payload: games,
    };
  };

  export const searchGamesFailure = (error) => {
  return {
    type: 'SEARCH_GAMES_FAILURE',
    payload: error,
  };
};

export const fetchGameByIdRequest = () => {
  return {
    type: 'FETCH_GAME_BY_ID_REQUEST',
  };
};

export const fetchGameByIdSuccess = (game) => {
  return {
    type: 'FETCH_GAME_BY_ID_SUCCESS',
    payload: game,
  };
};

export const fetchGameByIdFailure = (error) => {
  return {
    type: 'FETCH_GAME_BY_ID_FAILURE',
    payload: error,
  };
};

  export const fetchGenresRequest = () => {
    return {
      type: 'FETCH_GENRES_REQUEST',
    };
  };
  
  export const fetchGenresSuccess = (genres) => {
    return {
      type: 'FETCH_GENRES_SUCCESS',
      payload: genres,
    };
  };
  
  export const fetchGenresFailure = (error) => {
    return {
      type: 'FETCH_GENRES_FAILURE',
      payload: error,
    };
  };

  export const filterGamesByGenre = (genre) => {
    return {
      type: 'FILTER_GAMES_BY_GENRE',
      payload: genre,
    };
  };

  export const createVideogameSuccess = (newVideogame) => {
    console.log(newVideogame);
    return {
      type: 'CREATE_VIDEOGAME_SUCCESS',
      payload: newVideogame,
    };
  };

  export const createVideogameFailure = (errorMessage) => {
    return {
      type: 'CREATE_VIDEOGAME_FAILURE',
      payload: errorMessage,
    };
  };

  export const setFormData = (formData) => {
    console.log(formData);
    return {
      type: 'SET_FORM_DATA',
      payload: formData,
    };
  };
  
  export const resetFormData = () => {
    return {
      type: 'RESET_FORM_DATA',
    };
  };

  export const fetchAllGames = (page) => {
    return (dispatch) => {
      dispatch(fetchAllGamesRequest());
      axios.get(`/videogames/${page}`)
        .then((response) => {
          dispatch(fetchAllGamesSuccess(response.data));
        })
        .catch((error) => {
          dispatch(fetchAllGamesFailure(error.message));
        });
    };
  };
  
  export const searchGames = (searchTerm) => {
    return (dispatch) => {
      dispatch(searchGamesRequest());
  
      axios
        .get(`/videogames/name/search?name=${searchTerm}`)
        .then((response) => {
          dispatch(searchGamesSuccess(response.data));
        })
        .catch((error) => {
          dispatch(searchGamesFailure(error.message));
        });
    };
  };

  export const fetchGameById = (id) => {
    return (dispatch) => {
      dispatch(fetchGameByIdRequest());
  
      axios.get(`/videogames/id/${id}`)
        .then((response) => {
          dispatch(fetchGameByIdSuccess(response.data));
        })
        .catch((error) => {
          dispatch(fetchGameByIdFailure(error.message));
        });
    };
  };

  
  export const fetchGenres = () => {
    return (dispatch) => {
      dispatch(fetchGenresRequest());
  
      axios
        .get('/videogames/genero/genres')
        .then((response) => {
          dispatch(fetchGenresSuccess(response.data));
        })
        .catch((error) => {
          dispatch(fetchGenresFailure(error.message));
        });
    };
  };


  export const createVideogame = (formData) => {
    console.log(formData);
    return async (dispatch) => {
      try {
        const response = await axios.post('/videogames/', formData);
        const newVideogame = response.data;
        console.log(newVideogame);
       
        dispatch(createVideogameSuccess(newVideogame));
        
      } catch (error) {
       
        dispatch(createVideogameFailure(error.message));
      }
    };
  };