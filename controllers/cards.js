const mongoose = require('mongoose');
const Card = require('../models/card');
const User = require('../models/user');

module.exports.getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});
    res.json(cards);
  } catch (err) {
    next(err);
  }
};

module.exports.createCard = async (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user && req.user._id;

  if (!name || !link) {
    return res.status(400).json({ error: 'Os campos name e link são obrigatórios' });
  }

  if (!owner) {
    return res.status(401).json({ error: 'Usuário não autenticado' });
  }

  if (!mongoose.Types.ObjectId.isValid(owner)) {
    return res.status(400).json({ error: 'ID de usuário inválido' });
  }

  try {
    const ownerUser = await User.findById(owner);
    if (!ownerUser) {
      return res.status(404).json({ error: 'Usuário (owner) não encontrado' });
    }

    const card = await Card.create({ name, link, owner });
    res.status(201).json(card);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    next(err);
  }
};

module.exports.deleteCard = async (req, res, next) => {
  const { cardId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(cardId)) {
    return res.status(404).json({ error: 'Cartão não encontrado' });
  }

  try {
    const deletedCard = await Card.findByIdAndDelete(cardId);
    if (!deletedCard) {
      return res.status(404).json({ error: 'Cartão não encontrado' });
    }
    res.json(deletedCard);
  } catch (err) {
    next(err);
  }
};