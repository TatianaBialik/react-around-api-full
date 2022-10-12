const dbserver = 'mongodb://localhost:27017/aroundb';

const notFoundErrorMessage = 'Requested resource not found';
const userNotFoundErrorMessage = 'User not found';
const loginErrorMessage = 'Incorrect password or email';

module.exports = {
  dbserver,
  notFoundErrorMessage,
  userNotFoundErrorMessage,
  loginErrorMessage,
};
