const express = require('express');
const router = express.Router();
const { getCards, createCard, deleteCard } = require('../controllers/cards');

// GET /cards - todos os cartões
router.get('/', getCards);

// POST /cards - criar novo cartão
router.post('/', createCard);

// DELETE /cards/:cardId - deletar cartão
router.delete('/:cardId', deleteCard);

module.exports = router;