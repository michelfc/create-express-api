const fs = require('fs');
const yesno = require("yesno");
const path = require('path');
const crypto = require('crypto');
require('dotenv').config({ path: fs.existsSync("./.env") ? '.env' : '.env.local' });

const keyPath = process.env.KEYS_PATH;
const privKeyFile = path.join(keyPath, process.env.KEYS_PRIVATE_FILE);
const publKeyFile = path.join(keyPath, process.env.KEYS_PUBLIC_FILE);

const publicKeyEncoding = {
    type: 'spki',
    format: 'pem',
}

const privateKeyEncoding = {
    type: 'pkcs8',
    format: 'pem',
    cipher: 'aes-256-cbc',
    passphrase: process.env.CRYPTO_KEY_PAIR_PASSWORD,
}

async function generateKey() {
    let generateKey = false;
    if (fs.existsSync(privKeyFile) && fs.existsSync(publKeyFile)) {
        generateKey = await yesno({
            question: "The keys already exist, do you want to replace them? ( yes | no )"
        });
    }
    else {
        generateKey = true;
    }

    if (generateKey === true) {
        const { err, publicKey, privateKey } = crypto.generateKeyPairSync("rsa", { modulusLength: 2048 })
        if (err) {
            throw err;
        }
        else {
            const keyPathExists = fs.existsSync(keyPath);
            if (!keyPathExists) { fs.mkdirSync(keyPath); }
            fs.writeFileSync(privKeyFile, privateKey.export(privateKeyEncoding));
            fs.writeFileSync(publKeyFile, publicKey.export(publicKeyEncoding));
        }

        console.log("Key successfully generated");
        console.log("Path:", path.resolve(keyPath));
        console.log("Private Key:", path.resolve(privKeyFile));
        console.log("Public Key:", path.resolve(publKeyFile));
    }
    else {
        console.warn("Key not generated")
    }
}

generateKey();