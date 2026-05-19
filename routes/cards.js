const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const cardsPath = path.join(__dirname, '..', 'data', 'cards.json');
const cards = JSON.parse(fs.readFileSync(cardsPath, 'utf8'));

// GET /cards - todos os cartões
router.get('/', (req, res) => {
  res.json(cards);
});

module.exports = router;