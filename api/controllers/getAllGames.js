require("dotenv").config();
const axios = require('axios');
const { API_KEY } = process.env;
const { Videogame, Genre } = require('../src/db');
const GameViewModel = require('../viewmodels/gameViewModel');

const gamesPerPage = 20;

const getAllGames = async (req, res) => {
  try {
    const { page } = req.params;
    const games = [];

    // Calcular el desplazamiento (offset) según la página actual
    const offset = (page - 1) * gamesPerPage;

    // Obtener los juegos de la base de datos según la paginación
    const getGamesFromDb = await Videogame.findAll({
      include: Genre,
      offset: offset,
      limit: gamesPerPage
    });

    // Agregar los juegos de la base de datos al arreglo de juegos
    games.push(
      ...getGamesFromDb.map(game => {
        return new GameViewModel(
          game.id,
          game.name,
          game.platforms,
          game.background_image,
          game.released,
          game.rating,
          game.genres
        );
      })
    );

    // Calcular cuántos juegos faltan para completar la página
    const gamesFromDbCount = getGamesFromDb.length;
    const gamesFromApiCount = gamesPerPage - gamesFromDbCount;

    // Verificar si es necesario obtener más juegos de la API
    if (gamesFromApiCount > 0) {
      const URL_BASE = `https://api.rawg.io/api/games?key=${API_KEY}&page_size=${gamesFromApiCount}&page=${page || 1}`;
      const response = await axios.get(URL_BASE);
      const gamesFromApi = response.data.results;

      // Obtener los géneros de la API para cada juego
      const gamesWithGenresFromApi = await Promise.all(
        gamesFromApi.map(async game => {
          const gameDetails = await axios.get(`https://api.rawg.io/api/games/${game.id}?key=${API_KEY}`);
          const platforms = gameDetails.data.platforms.map(({ platform }) => platform.name);
          const genres = gameDetails.data.genres.map(genre => ({ id: genre.id, name: genre.name }));
          return new GameViewModel(
            game.id,
            game.name,
            platforms,
            game.background_image,
            game.released,
            game.rating,
            genres
          );
        })
      );

      // Agregar los juegos de la API al arreglo de juegos
      games.push(...gamesWithGenresFromApi);
    }

    res.json(games);
  } catch (error) {
    console.log('Error al obtener todos los videojuegos:', error);
    res.status(500).json({ message: 'Error al obtener todos los videojuegos' });
  }
}

module.exports = getAllGames;
