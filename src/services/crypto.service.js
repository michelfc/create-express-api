const randtoken = require('rand-token');
const crypto = require('crypto');
const Cryptr = require('cryptr');

const cryptr = new Cryptr(process.env.CRYPTO_AES_PASSWORD);

function generateToken() {
  return randtoken.uid(256);
}

const cryptoService = {
  generateToken,
  hash: (password) => {
    const hmac = crypto.createHmac(process.env.CRYPTO_HASH_ALGORITM,
      process.env.CRYPTO_HASH_PASSWORD);
    return hmac.update(password).digest('hex');
  },
  encrypt: cryptr.encrypt,
  decrypt: cryptr.decrypt,
};

module.exports = cryptoService;
