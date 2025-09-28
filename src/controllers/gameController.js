const yamConfig = require('../config/yamConfig').default;

exports.renderGame2 = (req, res) => {
  const mode = req.query.mode || 'Turbo';
  const config = yamConfig.modes[mode] || yamConfig.modes.turbo;
  // Prépare les joueurs, figures, colonnes, etc.
  const joueurs = [
    { name: 'Aurelien'},
    { name: 'Amelie' },
  ];
  res.render('game', {
    title: 'Yam\'s',
    joueurs,
    figures: yamConfig.figures,
    colonnesParJoueur: config.columns,
    mode: config.name
  });
};