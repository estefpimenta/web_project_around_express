const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const cardsPath = path.join(__dirname, '..', 'data', 'cards.json');
const usersPath = path.join(__dirname, '..', 'data', 'users.json');

const readCards = () => JSON.parse(fs.readFileSync(cardsPath, 'utf8'));
const writeCards = (data) => fs.writeFileSync(cardsPath, JSON.stringify(data, null, 2), 'utf8');
const readUsers = () => JSON.parse(fs.readFileSync(usersPath, 'utf8'));

// GET /cards - todos os cartões
router.get('/', (req, res) => {
  const cards = readCards();
  res.json(cards);
});

// POST /cards - criar novo cartão
router.post('/', (req, res) => {
  const { name, link } = req.body;
  const ownerId = req.user && req.user._id;

  // Validação básica
  if (!name || !link) {
    return res.status(400).json({
      error: 'Os campos name e link são obrigatórios'
    });
  }

  if (!ownerId) {
    return res.status(401).json({
      error: 'Usuário não autenticado'
    });
  }

  // Validação de URL do link
  const urlRegex = /^(https?:\/\/)([a-z0-9-]+\.)*[a-z0-9-]+(:[0-9]+)?(\/.*)?$/i;
  if (!urlRegex.test(link)) {
    return res.status(400).json({
      error: 'O campo link deve ser uma URL válida'
    });
  }

  // Validar que o usuário (owner) existe
  const users = readUsers();
  const ownerUser = users.find(u => u._id === ownerId);
  if (!ownerUser) {
    return res.status(404).json({
      error: 'Usuário (owner) não encontrado'
    });
  }

  // Gerar ID único
  const _id = Math.random().toString(16).slice(2);

  // Criar novo cartão
  const newCard = {
    _id,
    name,
    link,
    owner: ownerUser,
    likes: [],
    createdAt: new Date().toISOString()
  };

  // Adicionar ao arquivo JSON
  const cards = readCards();
  cards.push(newCard);
  writeCards(cards);

  res.status(201).json(newCard);
});

// DELETE /cards/:cardId - deletar cartão
router.delete('/:cardId', (req, res) => {
  const { cardId } = req.params;

  const cards = readCards();
  const cardIndex = cards.findIndex(c => c._id === cardId);

  if (cardIndex === -1) {
    return res.status(404).json({
      error: 'Cartão não encontrado'
    });
  }

  const deletedCard = cards[cardIndex];
  cards.splice(cardIndex, 1);
  writeCards(cards);

  res.json(deletedCard);
});

module.exports = router;