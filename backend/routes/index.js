const router = require('express').Router();
const cardsRouter = require('./cards');
const usersRouter = require('./users');
const { NOT_FOUND_ERROR_CODE, notFoundErrorMessage } = require('../utils/constants');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { validateAuthentication } = require('../utils/validation');

router.post('/signin', validateAuthentication, login);
router.post('/signup', validateAuthentication, createUser);

router.use(auth);

router.use('/cards', cardsRouter);
router.use('/users', usersRouter);
router.use('/*', (req, res) => {
  res.status(NOT_FOUND_ERROR_CODE).send({ message: notFoundErrorMessage });
});

module.exports = router;
