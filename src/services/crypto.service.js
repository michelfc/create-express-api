const crypto = require("crypto");
const Cryptr = require("cryptr");
const cryptr = new Cryptr(process.env.CRYPTO_PASSWORD);

const CryptoService = {
    hash: (password) => {
        let hmac = crypto.createHmac(process.env.CRYPTO_HASH_ALGORITM, process.env.CRYPTO_HASH_PASSWORD);
        return hmac.update(password).digest("hex");
    },
    encrypt: cryptr.encrypt,
    decrypt: cryptr.decrypt
}

module.exports = CryptoService;