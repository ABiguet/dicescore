import express from 'express';
import gameController from '../controllers/gameController.js';
const router = express.Router();

router.get('/game', gameController.renderGame);
router.post('/init-game', (req, res) => {
    req.session.players = req.body.players; // Par exemple un tableau de noms
    req.session.mode = req.body.mode;
    res.sendStatus(200);
});

export default router;
