const fs = require('fs');
const randtoken = require('rand-token');
const expressJwt = require('express-jwt');
const jwtGenerator = require('jsonwebtoken');
const cryptoService = require('../services/crypto.service');
const privateKey = fs.readFileSync('./src/keys/private.key');
const publicKey = fs.readFileSync('./src/keys/public.key');
const expirationTime = process.env.JWT_EXPIRATION_TIME;

function generateToken() {
  return randtoken.uid(256);
}

const jwtService = {
  generateToken,

  getCurrentUserData: (req) => {
    return JSON.parse(cryptoService.decrypt(req.jwt.user))
  },

  sign: (userData) => jwtGenerator.sign({ user:  cryptoService.encrypt(JSON.stringify(userData)) }, privateKey, {
    jwtid: generateToken(), noTimestamp: false, algorithm: 'RS512', expiresIn: expirationTime,
  }),

  decode: (jwt) => jwtGenerator.verify(jwt, publicKey, { algorithms: 'RS512' }),

  refresh: (jwt) => jwtGenerator.sign(jwt.user),

  validate: (jwt) => {
    const decoded = jwtGenerator.decode(jwt);
    return decoded !== undefined && decoded !== null;
  },

  jwtRoute: expressJwt({ secret: publicKey, algorithms: ['RS512'], requestProperty: 'jwt' }),
};

module.exports = jwtService;
