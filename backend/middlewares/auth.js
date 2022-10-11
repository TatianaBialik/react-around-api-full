const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/constants');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { NODE_ENV = 'development', JWT_SECRET } = process.env;

const handleAuthError = (next) => next(new UnauthorizedError('Authorization error'));

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer')) {
    return handleAuthError(next);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return handleAuthError(next);
  }

  req.user = payload._id;
  next();
};
