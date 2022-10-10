const {
  validateUserProfile,
  validateUserAvatar,
  validateHeaders,
} = require('../utils/validation');

const router = require('express').Router();
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

// router.get('/', getUsers);
router.get('/me', validateHeaders, getUser);
router.patch('/me', validateUserProfile, updateUser);
router.patch('/me/avatar', validateUserAvatar, updateAvatar);

module.exports = router;
