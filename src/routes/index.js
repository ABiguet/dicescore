import express from 'express';
import { getPlayers } from '../db/player.js';
const router = express.Router();

/* GET home page. */
router.get('/', async function (req, res, next) {
  const players = req.session.players || [];
  try {
    const playersDb = await getPlayers();
    console.log('Joueurs depuis la DB :', playersDb);
    res.render('index', { title: 'Nouvelle partie', players, playersDb, messages: req.flash() });
  } catch (err) {
    next(err);
  }
});

export default router;
