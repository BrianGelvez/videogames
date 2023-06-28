const { Router } = require('express');
const getVideogameById = require('../../controllers/getVideogameById.js')
const getAllGames  = require('../../controllers/getAllGames.js')
const addVideogame = require('../../controllers/addVideogame.js')
const getNameVideogames = require('../../controllers/getNameVideogames.js')
const getGenresFromApi = require('../../controllers/getGenresFromApi.js')


const router = Router();

// Configurar los routers
router.get('/videogames', getAllGames);
router.get('/videogames/:page', getAllGames);
router.get('/videogames/id/:idVideogame', getVideogameById);
router.get('/videogames/name/search', getNameVideogames);
router.post('/videogames', addVideogame);
router.get('/videogames/genero/genres', getGenresFromApi);




module.exports = router;
