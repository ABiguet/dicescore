const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

router.get('/game', gameController.renderGame);

module.exports = router;