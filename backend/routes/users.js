const router = require('express').Router();
const {
  validateUserProfile,
  validateUserAvatar,
  validateHeaders,
} = require('../utils/validation');

const {
  getUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

router.get('/me', validateHeaders, getUser);
router.patch('/me', validateUserProfile, updateUser);
router.patch('/me/avatar', validateUserAvatar, updateAvatar);

module.exports = router;
