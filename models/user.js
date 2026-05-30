const mongoose = require('mongoose');

const urlRegex = /^(https?:\/\/)(www\.)?[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)+([\/A-Za-z0-9\-._~:?%#[\]@!$&'()*+,;=]*)?#?$/;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'O nome é obrigatório'],
    minlength: [2, 'O nome deve ter pelo menos 2 caracteres'],
    maxlength: [30, 'O nome deve ter no máximo 30 caracteres'],
  },
  about: {
    type: String,
    required: [true, 'A informação sobre o usuário é obrigatória'],
    minlength: [2, 'A informação deve ter pelo menos 2 caracteres'],
    maxlength: [30, 'A informação deve ter no máximo 30 caracteres'],
  },
  avatar: {
    type: String,
    required: [true, 'O avatar é obrigatório'],
    validate: {
      validator: (v) => urlRegex.test(v),
      message: 'O campo avatar deve ser uma URL válida',
    },
  },
});

module.exports = mongoose.model('User', userSchema);
