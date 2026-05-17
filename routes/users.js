const express = require('express');
const router = express.Router();
const users = require('../data/users.json');

// GET /users - todos os usuários
router.get('/', (req, res) => {
  res.json(users);
});

// GET /users/:id - usuário específico
router.get('/:id', (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  if (!user) {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }
  res.json(user);
});

module.exports = router;