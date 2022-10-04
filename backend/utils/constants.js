const dbserver = 'mongodb://localhost:27017/aroundb';

const INVALID_DATA_ERROR_CODE = 400;
const NOT_FOUND_ERROR_CODE = 404;
const DEFAULT_ERROR_CODE = 500;
const INVALID_LOGIN_ERROR_CODE = 401;

const defaultErrorMessage = 'An error has occurred on the server';
const notFoundErrorMessage = 'Requested resource not found';
const userNotFoundErrorMessage = 'User not found';
const loginErrorMessage = 'Incorrect password or email';

module.exports = {
  dbserver,
  INVALID_DATA_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  DEFAULT_ERROR_CODE,
  INVALID_LOGIN_ERROR_CODE,
  defaultErrorMessage,
  notFoundErrorMessage,
  userNotFoundErrorMessage,
  loginErrorMessage,
};
