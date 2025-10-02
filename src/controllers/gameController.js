import yamConfig from '../config/yamConfig.js';

const renderGame = (req, res) => {
  // Prépare les joueurs, figures, colonnes, etc.
  const mode = req.session.mode || 'turbo';
  const players = req.session.players;

  // Vérifie si des joueurs sont présents
  if (!players || players.length === 0) {
    req.flash('error', 'Aucun joueur défini pour la partie.');
    return res.redirect('/');
  }
  console.log('Joueurs en session :', req.session.players);
  const config = yamConfig.modes[mode] || yamConfig.modes.turbo;
  res.render('game', {
    title: 'Yahtzee - Partie en cours',
    players,
    figures: yamConfig.figures,
    colonnesParJoueur: config.columns,
    mode: config.name,
  });
};

export default {
  renderGame,
};
