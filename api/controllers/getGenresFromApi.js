const { Genre } = require('../src/db');
const axios = require('axios');
const { API_KEY } = process.env;

const getGenresFromApi = async (req, res) => {
  try {
    // Obtener los géneros de la API
    const response = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
    const genresFromApi = response.data.results;
    
    const genres = genresFromApi.map(genre => ({
        id: genre.id,
        name: genre.name
    }));

    if (genres.length === 0) {
      // No se encontraron géneros en la API
      res.status(404).json({ message: 'No se encontraron géneros' });
      return;
    }

    // Guardar los géneros en la base de datos
    await Promise.all(
      genres.map(async genre => {
        await Genre.findOrCreate({
          where: { id: genre.id },
          defaults: genre
        });
      })
    );

    // Devolver los géneros como respuesta
    res.json(genres);
  } catch (error) {
    console.log('Error:', error);
    res.status(500).json({ message: 'Error al obtener los géneros' });
  }
};

module.exports = getGenresFromApi;
