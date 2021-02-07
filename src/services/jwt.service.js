const fs = require('fs');
const path = require('path');
const expressJwt = require('express-jwt');
const jwtGenerator = require('jsonwebtoken');
const { decrypt, encrypt, generateToken } = require('./crypto.service');

const keyPath = process.env.KEYS_PATH;
const privKeyFile = path.join(keyPath, process.env.KEYS_PRIVATE_FILE);
const publKeyFile = path.join(keyPath, process.env.KEYS_PUBLIC_FILE);

const privateKey = fs.readFileSync(privKeyFile);
const publicKey = fs.readFileSync(publKeyFile);
const expirationTime = process.env.JWT_EXPIRATION_TIME;

const jwtService = {
  generateToken,

  getCurrentUserData: (req) => JSON.parse(decrypt(req.jwt.user)),

  sign: (userData) => jwtGenerator.sign({ user: encrypt(JSON.stringify(userData)) },
    { key: privateKey, passphrase: process.env.CRYPTO_KEY_PAIR_PASSWORD }, {
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
