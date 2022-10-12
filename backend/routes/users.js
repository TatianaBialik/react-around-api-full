const router = require('express').Router();
const {
  validateUserProfile,
  validateUserAvatar,
  validateHeaders,
  validateId,
} = require('../utils/validation');

const {
  getUsers,
  getUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

router.get('/me', validateHeaders, getUser);
router.get('/', getUsers);
router.get('/:id', validateId, getUser);
router.patch('/me', validateUserProfile, updateUser);
router.patch('/me/avatar', validateUserAvatar, updateAvatar);

module.exports = router;
