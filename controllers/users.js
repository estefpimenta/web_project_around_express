const User = require('../models/user');

module.exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    next(err);
  }
};

module.exports.getUserById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).orFail();

    res.json(user);
  } catch (err) {
    next(err);
  }
};

module.exports.createUser = async (req, res, next) => {
  const { name, about, avatar } = req.body;

  if (!name || !about || !avatar) {
    return res.status(400).json({
      error: 'Os campos name, about e avatar são obrigatórios',
    });
  }

  try {
    const user = await User.create({
      name,
      about,
      avatar,
    });

    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};