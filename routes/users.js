const express = require('express');
const router = express.Router();
const { getUsers, getUserById, createUser } = require('../controllers/users');

// GET /users - todos os usuários
router.get('/', getUsers);

// GET /users/:id - usuário específico
router.get('/:id', getUserById);

// POST /users - criar novo usuário
router.post('/', createUser);

module.exports = router;