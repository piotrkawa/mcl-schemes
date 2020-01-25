const { getRandomScalar, generateG1, mul } = require("./operations.js");
const { CONFIG } = require("../config");

function generatePrivateAndPublicKeys() {
  const privateKey = generatePrivateKey();
  const publicKey = generatePublicKey(privateKey);
  return { privateKey, publicKey };
}

function generatePrivateKey() {
  return getRandomScalar();
}

function generatePublicKey(privateKey) {
  const g = generateG1(`${CONFIG.CONST_G1.x} ${CONFIG.CONST_G1.y}`);
  return mul(g, privateKey);
}

module.exports = {
  generatePrivateAndPublicKeys,
  generatePrivateKey,
  generatePublicKey
}
