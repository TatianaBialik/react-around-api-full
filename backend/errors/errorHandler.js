const {
  INVALID_DATA_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  DEFAULT_ERROR_CODE,
  INVALID_LOGIN_ERROR_CODE,
  defaultErrorMessage,
} = require('../utils/constants');

function errorHandler(err, res) {
  if (err.name === 'CastError') {
    res.status(INVALID_DATA_ERROR_CODE).send({ message: 'Invalid ID' });
    return;
  }

  if (err.statusCode === NOT_FOUND_ERROR_CODE) {
    res.status(NOT_FOUND_ERROR_CODE).send({ message: err.message });
    return;
  }

  if (err.name === 'ValidationError') {
    res.status(INVALID_DATA_ERROR_CODE).send({ message: err.message });
    return;
  }

  if (err.statusCode === INVALID_LOGIN_ERROR_CODE) {
    res.status(INVALID_LOGIN_ERROR_CODE).send({ message: err.message });
    return;
  }

  res.status(DEFAULT_ERROR_CODE).send({ message: defaultErrorMessage });
}

module.exports = errorHandler;
