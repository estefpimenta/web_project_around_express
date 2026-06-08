const express = require('express');
const mongoose = require('mongoose');

const app = express();

const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;

// Middleware para parser JSON
app.use(express.json());

// Rotas públicas de autenticação
app.use('/', authRouter);

// Middleware de autenticação global
app.use((req, res, next) => {
  const authorization = req.headers.authorization;

  if (authorization === 'Bearer authorized-user') {
    req.user = {
      _id: '5d8b8592978f8bd833ca8133',
    };
    return next();
  }

  return res.redirect('/signin');
});

// Rota raiz protegida
app.get('/', (req, res) => {
  res.send('Servidor Express rodando na porta 3000');
});

// Rotas protegidas
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

// Tratamento de rota não encontrada (404)
app.use((req, res) => {
  res.status(404).json({
    message: 'A solicitação não foi encontrada',
  });
});

// Middleware global de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err);

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Dados inválidos',
    });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({
      message: 'ID inválido',
    });
  }

  if (err.name === 'DocumentNotFoundError') {
    return res.status(404).json({
      message: 'Recurso não encontrado',
    });
  }

  return res.status(500).json({
    message: 'Ocorreu um erro no servidor',
  });
});

const mongoUrl = 'mongodb://localhost:27017/aroundb';

async function startServer() {
  try {
    await mongoose.connect(mongoUrl);

    console.log('Conectado ao MongoDB em', mongoUrl);

    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Erro ao conectar no MongoDB:', err);
    process.exit(1);
  }
}

startServer();