const express = require('express');

const router = express.Router();

const usersController = require('../controllers/users_controller');

router.get('/profile', usersController.profile); // link will be /users/profile
router.get('/category', usersController.category);

module.exports = router;