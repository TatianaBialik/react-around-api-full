const User = require('../models/user');
const errorHandler = require('../errors/errorHandler');
const { userNotFoundErrorMessage, NOT_FOUND_ERROR_CODE } = require('../utils/constants');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((error) => {
      errorHandler(error, res);
    });
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      const error = new Error(userNotFoundErrorMessage);
      error.statusCode = NOT_FOUND_ERROR_CODE;
      throw error;
    })
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      errorHandler(error, res);
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((error) => errorHandler(error, res));
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      const error = new Error(userNotFoundErrorMessage);
      error.statusCode = NOT_FOUND_ERROR_CODE;
      throw error;
    })
    .then((user) => res.send(user))
    .catch((error) => errorHandler(error, res));
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      const error = new Error(userNotFoundErrorMessage);
      error.statusCode = NOT_FOUND_ERROR_CODE;
      throw error;
    })
    .then((user) => res.send(user))
    .catch((error) => errorHandler(error, res));
};
