const dbserver = 'mongodb://localhost:27017/aroundb';

const INVALID_DATA_ERROR_CODE = 400;
const NOT_FOUND_ERROR_CODE = 404;
const DEFAULT_ERROR_CODE = 500;

const defaultErrorMessage = 'An error has occurred on the server';
const notFoundErrorMessage = 'Requested resource not found';
const userNotFoundErrorMessage = 'User not found';

module.exports = {
  dbserver,
  INVALID_DATA_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  DEFAULT_ERROR_CODE,
  defaultErrorMessage,
  notFoundErrorMessage,
  userNotFoundErrorMessage,
};
