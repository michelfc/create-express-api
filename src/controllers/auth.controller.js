const express = require('express');
const validateService = require('../services/validation.service');
const jwtService = require('../services/jwt.service');

async function login(req, res, next) {
  const validation = validateService.requiredProperties(req.body, 'email', 'password');
  if (validation.errors.length > 0) {
    res.status(400);
    next(validation);
  }
  else {
    let jwt = jwtService.sign({ email: req.body.email });
    res.json({ jwt });
  }
}

const router = express.Router();
router.post('/login', login);

module.exports = router;
