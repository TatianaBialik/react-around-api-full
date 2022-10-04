const mongoose = require('mongoose');
const validator = require('validator');
const { loginErrorMessage, INVALID_LOGIN_ERROR_CODE } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
    default: 'Jacques Cousteau',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
    default: 'Explorer',
  },
  avatar: {
    type: String,
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: 'URL is invalid',
    },
    required: true,
    default: 'https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg',
  },
  email: {
    type: String,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: 'Email is invalid',
    },
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email })
    .then((user) => {
      if(!user) {
        const error = new Error(loginErrorMessage);
        error.statusCode = INVALID_LOGIN_ERROR_CODE;
        return Promise.reject(error);
      };

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if(!matched) {
            const error = new Error(loginErrorMessage);
            error.statusCode = INVALID_LOGIN_ERROR_CODE;
            return Promise.reject(error);
          };

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
