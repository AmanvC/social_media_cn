const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller')

console.log("ROUTER LOADED")

router.get('/', homeController.home);
router.get('/login', homeController.login);

router.use('/users', require('./users'));  // any request with /users goes to users router settings
router.use('/posts', require('./posts'));

module.exports = router;