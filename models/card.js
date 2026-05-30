const mongoose = require('mongoose');

const urlRegex = /^(https?:\/\/)(www\.)?[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)+([\/A-Za-z0-9\-._~:?%#[\]@!$&'()*+,;=]*)?#?$/;

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'O nome do cartão é obrigatório'],
    minlength: [2, 'O nome do cartão deve ter pelo menos 2 caracteres'],
    maxlength: [30, 'O nome do cartão deve ter no máximo 30 caracteres'],
  },
  link: {
    type: String,
    required: [true, 'O link do cartão é obrigatório'],
    validate: {
      validator: (v) => urlRegex.test(v),
      message: 'O campo link deve ser uma URL válida',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'O owner é obrigatório'],
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'user',
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
