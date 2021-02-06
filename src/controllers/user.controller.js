const express = require('express');
const jwtService = require('../services/jwt.service');

async function getCurrentUser(req, res, next) {
  let user = jwtService.getCurrentUserData(req);
  res.json(user);
}

const router = express.Router();
router.get('/current', getCurrentUser);

module.exports = router;
