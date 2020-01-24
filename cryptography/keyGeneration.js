const { getRandomScalar, mul } = require("./operations.js");

function generatePrivateAndPublicKey() {
  const privateKey = generatePrivateKey();
  const publicKey = generatePublicKey(privateKey);
  return privateKey, publicKey;
}

function generatePrivateKey() {
  return getRandomScalar();
}

function generatePublicKey(privateKey) {
  const randomValue = getRandomScalar();
  return mul(privateKey, randomValue);
}

module.exports = { generatePrivateAndPublicKey, generatePrivateKey, generatePublicKey }
