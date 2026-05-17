const express = require('express');
const router = express.Router();
const cards = require('../data/cards.json');

// GET /cards - todos os cartões
router.get('/', (req, res) => {
  res.json(cards);
});

module.exports = router;