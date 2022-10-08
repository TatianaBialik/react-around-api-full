const Card = require('../models/card');
const errorHandler = require('../errors/errorHandler');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((error) => errorHandler(error, res));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user })
    .then((card) => res.send(card))
    .catch((error) => errorHandler(error, res));
};

module.exports.deleteCard = (req, res) => {
  // Card.findById(req.params.cardId)
  //   .orFail(() => {
  //     const error = new Error('Card not found');
  //     error.statusCode = 404;
  //     throw error;
  //   })
  //   .then((card) => {
  //     if (card.owner !== req.user) {
  //       const error = new Error('You dont have rights to delete this card');
  //       error.statusCode = 403;
  //       throw error;
  //     } else {
  //       Card.findByIdAndRemove(req.params.cardId)
  //         .then((card) => res.send(card))
  //         .catch((error) => errorHandler(error, res));
  //       }
  //   })
  //   .catch((error) => errorHandler(error, res));

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
    { $addToSet: { likes: req.user } },
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
    { $pull: { likes: req.user } },
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
