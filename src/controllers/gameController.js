const yamConfig = require('../config/yamConfig').default;

exports.renderGame = (req, res) => {
  const mode = req.query.mode || 'Turbo';
  const config = yamConfig.modes[mode] || yamConfig.modes.turbo;
  // Prépare les joueurs, figures, colonnes, etc.
  const joueurs = [
    { name: 'Aurélien'},
    { name: 'Amélie' },
  ];
  res.render('game', {
    title: 'Yam\'s',
    joueurs,
    figures: yamConfig.figures,
    colonnesParJoueur: config.columns,
    mode: config.name
  });
};

exports.renderGame2 = (req, res) => {
  const mode = req.query.mode || 'Turbo';
  const config = yamConfig.modes[mode] || yamConfig.modes.turbo;
  // Prépare les joueurs, figures, colonnes, etc.
  const joueurs = [
    { name: 'Aurélien'},
    { name: 'Amélie' },
  ];
  res.render('game2', {
    title: 'Yam\'s',
    joueurs,
    figures: yamConfig.figures,
    colonnesParJoueur: config.columns,
    mode: config.name
  });
};