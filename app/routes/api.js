const express = require('express');
const router = express.Router();

const {getTheme, getApp} = require('../controllers/WLController')
const {listGame, matchOdds, mainFrame} = require('../controllers/GameController')

router.get('/theme.css', getTheme);
router.get('/getapp', getApp);
router.get('/', mainFrame);
router.get('/listGames', listGame);
router.get('/matchOdds', matchOdds);

module.exports = router;