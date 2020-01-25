const { getRandomScalar, generateG1, generateG2, mul } = require("./operations.js");


function generatePrivateAndPublicKeys(parameters) {
  const privateKey = generatePrivateKey();
  const publicKey = generatePublicKey(privateKey, parameters);
  return { privateKey, publicKey };
}

function generatePrivateKey() {
  return getRandomScalar();
}

function generatePublicKey(privateKey, parameters) {
  const { generator, type } = parameters;
  const generatorFunction = type === "G2" ? generateG2 : generateG1;
  const g = generatorFunction(`${generator.x} ${generator.y}`);
  return mul(g, privateKey);
}

module.exports = {
  generatePrivateAndPublicKeys,
  generatePrivateKey,
  generatePublicKey
}
