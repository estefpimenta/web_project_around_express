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
  const owner = req.user._id;

  if (!name || !link) {
    return res.status(400).json({
      error: 'Os campos name e link são obrigatórios',
    });
  }

  try {
    const ownerUser = await User.findById(owner);

    if (!ownerUser) {
      return res.status(404).json({
        error: 'Usuário não encontrado',
      });
    }

    const card = await Card.create({
      name,
      link,
      owner,
    });

    res.status(201).json(card);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteCard = async (req, res, next) => {
  const { cardId } = req.params;

  try {
    const deletedCard = await Card.findByIdAndDelete(cardId)
      .orFail();

    res.json(deletedCard);
  } catch (err) {
    next(err);
  }
};

module.exports.likeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      {
        $addToSet: {
          likes: req.user._id,
        },
      },
      {
        new: true,
      },
    ).orFail();

    res.json(card);
  } catch (err) {
    next(err);
  }
};

module.exports.dislikeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      {
        $pull: {
          likes: req.user._id,
        },
      },
      {
        new: true,
      },
    ).orFail();

    res.json(card);
  } catch (err) {
    next(err);
  }
};