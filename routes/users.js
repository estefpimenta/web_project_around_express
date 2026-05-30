const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const usersPath = path.join(__dirname, '..', 'data', 'users.json');
const readUsers = () => JSON.parse(fs.readFileSync(usersPath, 'utf8'));
const writeUsers = (data) => fs.writeFileSync(usersPath, JSON.stringify(data, null, 2), 'utf8');

// GET /users - todos os usuários
router.get('/', (req, res) => {
  const users = readUsers();
  res.json(users);
});

// GET /users/:id - usuário específico
router.get('/:id', (req, res) => {
  const users = readUsers();
  const user = users.find(u => u._id === req.params.id);
  if (!user) {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }
  res.json(user);
});

// POST /users - criar novo usuário
router.post('/', (req, res) => {
  const { name, about, avatar } = req.body;

  // Validação básica
  if (!name || !about || !avatar) {
    return res.status(400).json({
      error: 'Os campos name, about e avatar são obrigatórios'
    });
  }

  // Validação de URL do avatar
  const urlRegex = /^(https?:\/\/)([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
  if (!urlRegex.test(avatar)) {
    return res.status(400).json({
      error: 'O campo avatar deve ser uma URL válida'
    });
  }

  // Gerar ID único
  const _id = Math.random().toString(16).slice(2);

  // Criar novo usuário
  const newUser = {
    name,
    about,
    avatar,
    _id
  };

  // Adicionar ao arquivo JSON
  const users = readUsers();
  users.push(newUser);
  writeUsers(users);

  res.status(201).json(newUser);
});

module.exports = router;