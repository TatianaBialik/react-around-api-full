const dbserver = 'mongodb://localhost:27017/aroundb';

const notFoundErrorMessage = 'Requested resource not found';
const userNotFoundErrorMessage = 'User not found';
const loginErrorMessage = 'Incorrect password or email';

const JWT_SECRET = '8564161eb2c382fb42868b61e2d82a17';

module.exports = {
  dbserver,
  notFoundErrorMessage,
  userNotFoundErrorMessage,
  loginErrorMessage,
};
