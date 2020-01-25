const operations = require("./cryptography/operations");
const SchnorrIdentificationScheme = require("./schemes/sis");
const mcl = require('mcl-wasm');
const { generatePrivateAndPublicKeys } = require("./cryptography/keyGeneration.js")
const { CONFIG } = require("./config");

async function run() {
  await mcl.init(mcl.BLS12_381);
  testSIS()
}

function testSIS() {
  const parameters = { 
    generatorG1: CONFIG.CONST_G1 
  };

  const SIS = new SchnorrIdentificationScheme(parameters);

  const { privateKey, publicKey } = generatePrivateAndPublicKeys();
  const { X, x } = SIS.generateCommitment();
  const c = SIS.generateChallenge();
  const proof = SIS.prove(x, privateKey, c);
  const isVerified = SIS.verify(publicKey, X, c, proof);
  console.log(isVerified);
}

run();

