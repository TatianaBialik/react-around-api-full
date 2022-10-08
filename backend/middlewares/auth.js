const { JWT_SECRET } = require('../utils/constants');
const jwt = require('jsonwebtoken');

const handleAuthError = (res) => {
  res.status(401).send({ message: 'Authorization error' });
};

// const extractToken = (req, res) => {
//   const { authorization } = req.headers;
//   if (!authorization || !authorization.startsWith('Bearer')) {
//     return handleAuthError(res);
//   };

//   const token = authorization.replace('Bearer ', '');
//   let payload;

//   try {
//     payload = jwt.verify(token, JWT_SECRET);
//   } catch (err) {
//     return handleAuthError(res);
//   };

//   return payload;
// };

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer')) {
    return handleAuthError(res);
  };

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return handleAuthError(res);
  };

  req.user = payload._id;
  next();
};
