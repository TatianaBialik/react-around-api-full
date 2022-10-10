const validator = require('validator');
const { errors, Joi, celebrate } = require('celebrate');
const { ObjectId } = require('mongoose').Types;

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  };

  return helpers.error('string.uri');
};

const validateObjectId = (value, helpers) => {
  if (ObjectId.isValid(value)) {
    return value;
  };

  return helpers.message('Object ID is invalid');
}

const validateAuthentication = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

// const validateUser = celebrate({
//   body: Joi.object().keys({
//     name: Joi.string().min(2).max(30),
//     about: Joi.string().min(2).max(30),
//     avatar: Joi.string().custom(validateURL),
//     email: Joi.string().required().email(),
//     password: Joi.string().required().min(8),
//   }),
//   headers: Joi.object().keys({
//     authorization: Joi.string().token().required(),
//   }),
// });

const validateUserProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(true),
});

const validateUserAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(validateURL),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(true),
});

const validateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(validateURL),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(true),
});

const validateId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().custom(validateObjectId),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(true),
});

const validateHeaders = celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(true),
});

module.exports = {
  validateAuthentication,
  validateUserProfile,
  validateUserAvatar,
  validateCard,
  validateId,
  validateHeaders,
};
