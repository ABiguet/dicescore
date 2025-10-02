import express from 'express';
import gameController from '../controllers/gameController.js';
const router = express.Router();

router.get('/game', gameController.renderGame);

router.post('/init-game', (req, res) => {
  req.session.players = req.body.players; // Par exemple un tableau de noms
  req.session.mode = req.body.mode;
  res.sendStatus(200);
});

router.post('/add-player-to-game', (req, res) => {
  if (!req.session.players) {
    req.session.players = [];
  }
  // Vérifier si le joueur existe déjà
  const existingPlayer = req.session.players.find(p => p.id === req.body.player.id);
  if (!existingPlayer) {
    req.session.players.push(req.body.player); // Ajouter un joueur
    res.sendStatus(200);
  }
  else {
    res.sendStatus(409);
  }
});

router.delete('/remove-player-from-game/:id', (req, res) => {
  const playerId = req.params.id;
  if (req.session.players) {
    req.session.players = req.session.players.filter(p => p.id !== playerId);
  }
  console.log('Joueurs en session après suppression :', req.session.players);
  res.sendStatus(200);
});

export default router;
