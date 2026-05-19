const express = require('express');
const app = express();

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;

app.get('/', (req, res) => {
  res.send('Servidor Express rodando na porta 3000');
});


// Conectar as rotas
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

// Tratamento de rota não encontrada (404)
app.use((req, res) => {
  res.status(404).json({ message: 'A solicitação não foi encontrada' });
});

// Tratamento de erros do servidor (500)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.status === 404
      ? 'A solicitação não foi encontrada'
      : 'Ocorreu um erro no servidor'
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});



