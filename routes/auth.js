const express = require('express');

const router = express.Router();

router.get('/signup', (req, res) => {
  res.send('Página de cadastro de usuário');
});

router.post('/signup', (req, res) => {
  const { name, about, avatar } = req.body;

  if (!name || !about || !avatar) {
    return res.status(400).json({
      message: 'Os campos name, about e avatar são obrigatórios',
    });
  }

  return res.status(201).json({
    message: 'Cadastro realizado com sucesso',
  });
});

router.get('/signin', (req, res) => {
  res.send('Página de login');
});

router.post('/signin', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: 'Email e senha são obrigatórios',
    });
  }

  return res.json({
    message: 'Usuário autorizado com sucesso',
  });
});

module.exports = router;
