const express = require('express');
const authController = require('./controllers/auth.controller');
const userController = require('./controllers/user.controller');
const jwtService = require('./services/jwt.service');

const router = express.Router();

router.use('/auth', authController);
router.use('/user', jwtService.jwtRoute, userController);

module.exports = router;
