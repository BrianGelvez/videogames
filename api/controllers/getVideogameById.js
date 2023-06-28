const { Videogame, Genre } = require('../src/db');
const axios = require('axios');
const { API_KEY } = process.env;
const GameViewModel = require('../viewmodels/gameViewModel');

const getVideogameById = async (req, res) => {
    const { idVideogame } = req.params;
    try {
        // Buscar el videojuego en la base de datos
        const videogameFromDb = await Videogame.findByPk(idVideogame, {
            include: Genre, // Incluir la información del género asociado
        });

        if (videogameFromDb) {
            // El videojuego fue encontrado en la base de datos

            const gameViewModel = new GameViewModel(
                videogameFromDb.id,
                videogameFromDb.name,
                videogameFromDb.platforms,
                videogameFromDb.background_image,
                videogameFromDb.released,
                videogameFromDb.rating,
                videogameFromDb.Genres,
                videogameFromDb.description,
                
            );

            res.json(gameViewModel);
        } else {
            // El videojuego no fue encontrado en la base de datos, buscar en la API
            const URL = `https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`;
            const response = await axios.get(URL);
            const gameFromApi = response.data;


            const platforms = gameFromApi.platforms.map(({ platform }) => platform.name);
            const genres = gameFromApi.genres.map(({ id, name }) => ({ id, name }));

            const gameViewModel = new GameViewModel(
                gameFromApi.id,
                gameFromApi.name,
                platforms,
                gameFromApi.background_image,
                gameFromApi.released,
                gameFromApi.rating,
                genres[0], // Género asociado en la API
                gameFromApi.description,
            );

            res.json(gameViewModel);
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error al obtener el videojuego' });
    }
};

module.exports = getVideogameById;