var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/game', function(req, res, next) {
  let joueurs = [
    { name: 'Aurélien'},
    { name: 'Amélie' },
  ]
  let gameType = req.query.gameType || 'classic';
  gameType = 'turbo';
  res.render('game', { title: 'Game', joueurs: joueurs, gameType: gameType });
});

module.exports = router;
