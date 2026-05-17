# Tripleten web_project_around_express

## Descrição do projeto

Esta é uma API simples em Node.js usando Express que serve dados de usuários e cartões a partir de arquivos JSON locais. O projeto expõe rotas para listar todos os usuários, retornar um usuário específico por ID e listar todos os cards.

## Funcionalidade

- `GET /users` → retorna todos os usuários em formato JSON
- `GET /users/:id` → retorna um usuário específico pelo ID em formato JSON
- `GET /cards` → retorna todos os cards em formato JSON

## Tecnologias e técnicas utilizadas

- Node.js
- Express
- CommonJS (`require` e `module.exports`)
- Arquivos JSON como fonte de dados (`data/users.json` e `data/cards.json`)
- Estrutura de rotas modularizada em `routes/users.js` e `routes/cards.js`
- Respostas em JSON com `res.json(...)`
- Rota dinâmica com parâmetros (`req.params.id`)
- `nodemon` para desenvolvimento local
- `eslint` para validação de estilo de código
