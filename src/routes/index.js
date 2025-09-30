var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    const joueurs = req.session.players || [];
    res.render('index', { title: 'Nouvelle partie', joueurs , messages: req.flash() });
});

module.exports = router;
