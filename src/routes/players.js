import express from 'express';
import { getPlayers, createPlayer, updatePlayer, deletePlayer } from '../db/player.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const players = await getPlayers();
  res.json(players);
});

router.post('/', async (req, res) => {
  const { name, color } = req.body;
  const player = await createPlayer(name, color);
  res.json(player);
});

router.put('/:id', async (req, res) => {
  const { name, color } = req.body;
  const player = await updatePlayer(Number(req.params.id), name, color);
  res.json(player);
});

router.delete('/:id', async (req, res) => {
  await deletePlayer(Number(req.params.id));
  res.json({ success: true });
});

export default router;