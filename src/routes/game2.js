const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

router.get('/game2', gameController.renderGame2);

module.exports = router;