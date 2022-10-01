const Card = require('../models/card');
const errorHandler = require('../errors/errorHandler');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((error) => errorHandler(error, res));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((error) => errorHandler(error, res));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(() => {
      const error = new Error('Card not found');
      error.statusCode = 404;
      throw error;
    })
    .then((card) => res.send(card))
    .catch((error) => errorHandler(error, res));
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      const error = new Error('Card not found');
      error.statusCode = 404;
      throw error;
    })
    .then((card) => res.send(card))
    .catch((error) => errorHandler(error, res));
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      const error = new Error('Card not found');
      error.statusCode = 404;
      throw error;
    })
    .then((card) => res.send(card))
    .catch((error) => errorHandler(error, res));
};
