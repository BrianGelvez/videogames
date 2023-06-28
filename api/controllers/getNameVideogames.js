const { Op } = require('sequelize');
const {Videogame, Genre} = require('../src/db');
const axios = require('axios');
const {API_KEY} = process.env;
const GameViewModel = require('../viewmodels/gameViewModel')


const getNameVideogames = async (req, res) => {
    const { name } = req.query;
    console.log('name:', name);
    try {
        // Buscar los videojuegos en la base de datos que coincidan con el nombre
        const videogamesFromDb = await Videogame.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%` // Búsqueda insensible a mayúsculas y minúsculas
                }
            },
            limit: 15,
            include: Genre
        });        

        // Buscar los videojuegos en la API que coincidan con el nombre
        const URL = `https://api.rawg.io/api/games?key=${API_KEY}&search=${name}&page_size=15`;
        const response = await axios.get(URL);
        const videogamesFromApi = response.data.results;

        if (videogamesFromDb.length === 0 && videogamesFromApi.length === 0) {
            res.status(404).json({ message: 'No se encontraron videojuegos' });
        }

        // Crear el arreglo de videojuegos combinando los resultados de la base de datos y la API
        const videogames = [];

        videogames.push(
            ...videogamesFromDb.map(game => {
                return new GameViewModel(
                    game.id,
                    game.name,
                    game.platforms,
                    game.background_image,
                    game.released,
                    game.rating,
                    game.Genres
                );
            })
        );

        videogames.push(
            ...videogamesFromApi.map(game => {
                const platforms = game.platforms.map(({ platform }) => platform.name);
                return new GameViewModel(
                    game.id,
                    game.name,
                    platforms,
                    game.background_image,
                    game.released,
                    game.rating,
                    game.genres
                );
            })
        );

        res.json(videogames);
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ message: 'Error al obtener los videojuegos por nombre' });
    }
};

module.exports = getNameVideogames;