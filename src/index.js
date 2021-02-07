require('dotenv').config({ path: process.env.NODE_ENV === 'local' ? '.env.local' : '.env' });
const fs = require('fs');
const path = require('path');

const keyPath = process.env.KEYS_PATH;
const privKeyFile = path.join(keyPath, process.env.KEYS_PRIVATE_FILE);
const publKeyFile = path.join(keyPath, process.env.KEYS_PUBLIC_FILE);

if (!fs.existsSync(keyPath) || !fs.existsSync(privKeyFile) || !fs.existsSync(publKeyFile)) {
  throw new Error(`Crypto Keys not found, please run command 'npm run keygen' to generate a new key or put existent key files on ${path.resolve(keyPath)}`);
}

const server = require('./server');

server.start();
