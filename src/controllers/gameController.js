const yamConfig = require('../config/yamConfig').default;

exports.renderGame = (req, res) => {
    // Prépare les joueurs, figures, colonnes, etc.
    const mode = req.session.mode || 'turbo';
    const joueurs = req.session.players;
    // Vérifie si des joueurs sont présents
    if (!joueurs || joueurs.length === 0) {
        req.flash('error', 'Aucun joueur défini pour la partie.');
        return res.redirect('/');
    }
    console.log('Joueurs en session :', req.session.players);
    const config = yamConfig.modes[mode] || yamConfig.modes.turbo;
    res.render('game', {
        title: 'Yahtzee - Partie en cours',
        joueurs,
        figures: yamConfig.figures,
        colonnesParJoueur: config.columns,
        mode: config.name,
    });
};
