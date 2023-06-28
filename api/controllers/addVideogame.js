const { Videogame } = require('../src/db');

const addVideogame = async (req, res) => {
    const { name, description, platforms, background_image, released, rating, genres } = req.body;
  
    try {
      const newVideogame = await Videogame.create({
        name,
        description,
        platforms,
        background_image,
        released,
        rating,
      });
  
      if (genres && genres.length > 0) {
        await newVideogame.setGenres(genres);
      }
  
      console.log('Videogame created:', newVideogame);
      res.status(201).json(newVideogame);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear el videojuego' });
    }
  };
  
  module.exports = addVideogame;