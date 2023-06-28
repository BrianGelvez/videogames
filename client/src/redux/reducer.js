const initialState = {
  loading: false,
  games: [],
  game: null,
  genres: [],
  filteredGames: [],
  error: null,
  newVideogame: null,
  formData: {
    name: '',
    background_image: '',
    description: '',
    platforms: '',
    released: '',
    rating: '',
    genres: [],
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_GENRES_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'FETCH_GENRES_SUCCESS':
      return {
        ...state,
        loading: false,
        genres: action.payload,
        error: null,
      };
    case 'FETCH_GENRES_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'FILTER_GAMES_BY_GENRE':
      const genre = action.payload;
      // console.log('Selected genre:', genre);
      const filteredGames = state.games.filter((game) =>
        game.genres.some((g) => g.name === genre)
      );
      console.log('Filtered games:', filteredGames);
      return {
        ...state,
        filteredGames,
        error: null,
      };
    // ...
    case 'FETCH_GAME_BY_ID_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'FETCH_GAME_BY_ID_SUCCESS':
      // console.log(action.payload);
      return {
        ...state,
        loading: false,
        game: action.payload,
        error: null,
      };
    case 'FETCH_GAME_BY_ID_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'FETCH_ALL_GAMES_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'FETCH_ALL_GAMES_SUCCESS':
      return {
        ...state,
        loading: false,
        games: action.payload,
        error: null,
      };
    case 'FETCH_ALL_GAMES_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'SORT_GAMES_ASCENDING':
      console.log('Sorting games ascending:', state.games);
      return {
        ...state,
        filteredGames: [...state.games].sort((a, b) => a.name.localeCompare(b.name)),
      };

    case 'SORT_GAMES_DESCENDING':
      console.log('Sorting games descending:', state.games);
      return {
        ...state,
        filteredGames: [...state.games].sort((a, b) => b.name.localeCompare(a.name)),
      };
    case 'FILTER_GAMES_BY_RATING_ASCENDING':
      console.log('Filtering games by rating ascending:', state.games);
      return {
        ...state,
        filteredGames: [...state.games].sort((a, b) => a.rating - b.rating),
      };

    case 'FILTER_GAMES_BY_RATING_DESCENDING':
      console.log('Filtering games by rating descending:', state.games);
      return {
        ...state,
        filteredGames: [...state.games].sort((a, b) => b.rating - a.rating),
      };
    case 'SEARCH_GAMES_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'SEARCH_GAMES_SUCCESS':
      return {
        ...state,
        loading: false,
        games: action.payload,
        error: null,
      };
    case 'SEARCH_GAMES_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'CREATE_VIDEOGAME_SUCCESS':
      console.log(state);
      return {
        ...state,
        newVideogame: action.payload,
        error: null,
      };
    case 'CREATE_VIDEOGAME_FAILURE':
      return {
        ...state,
        newVideogame: null,
        error: action.payload,
      };
    case 'SET_FORM_DATA':
      console.log(state);
      return {
        ...state,
        formData: action.payload,
      };
    case 'RESET_FORM_DATA':
      return {
        ...state,
        formData: initialState.formData,
      };
    default:
      return state;
  }
};

export default reducer;


// reducer agregados para el filtrado

// case 'FETCH_GENRES_REQUEST':
//   return {
//     ...state,
//     loading: true,
//     error: null,
//   };
// case 'FETCH_GENRES_SUCCESS':
//   return {
//     ...state,
//     loading: false,
//     genres: action.payload,
//     error: null,
//   };
// case 'FETCH_GENRES_FAILURE':
//   return {
//     ...state,
//     loading: false,
//     error: action.payload,
//   };
// case 'FILTER_GAMES_BY_GENRE':
//   const genre = action.payload;
//   const filteredGames = state.games.filter((game) =>
//     game.genre.includes(genre)
//   );
//   return {
//     ...state,
//     filteredGames,
//     error: null,
//   };