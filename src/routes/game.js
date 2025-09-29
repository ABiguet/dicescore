const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

router.get('/game', gameController.renderGame);
router.post('/init-game', (req, res) => {
  req.session.players = req.body.players; // Par exemple un tableau de noms
  req.session.mode = req.body.mode;
  res.sendStatus(200);
});

module.exports = router;