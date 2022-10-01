const router = require('express').Router();
const cardsRouter = require('./cards');
const usersRouter = require('./users');
const { NOT_FOUND_ERROR_CODE, notFoundErrorMessage } = require('../utils/constants');

router.use('/cards', cardsRouter);
router.use('/users', usersRouter);
router.use('/*', (req, res) => {
  res.status(NOT_FOUND_ERROR_CODE).send({ message: notFoundErrorMessage });
});

module.exports = router;
