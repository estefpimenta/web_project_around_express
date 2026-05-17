const express = require('express');
const app = express();
const { PORT = 3000 } = process.env;

app.get('/', (req, res) => {
  res.send('Servidor Express rodando na porta 3000');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
