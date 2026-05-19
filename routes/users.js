const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const usersPath = path.join(__dirname, '..', 'data', 'users.json');
const users = JSON.parse(fs.readFileSync(usersPath, 'utf8'));

// GET /users - todos os usuários
router.get('/', (req, res) => {
  res.json(users);
});

// GET /users/:id - usuário específico
router.get('/:id', (req, res) => {
  const user = users.find(u => u._id === req.params.id);
  if (!user) {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }
  res.json(user);
});

module.exports = router;