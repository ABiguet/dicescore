const yamConfig = require('../config/yamConfig').default;

exports.renderGame = (req, res) => {

  // Prépare les joueurs, figures, colonnes, etc.
  const mode = req.session.mode || 'turbo';
  const joueurs = (req.session.players || ['Alice', 'Bob']).map(name => ({ name }));
  const config = yamConfig.modes[mode] || yamConfig.modes.turbo;
  res.render('game', {
    title: 'Yam\'s',
    joueurs,
    figures: yamConfig.figures,
    colonnesParJoueur: config.columns,
    mode: config.name
  });
};