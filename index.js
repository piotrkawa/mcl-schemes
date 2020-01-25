const mcl = require('mcl-wasm');
const assert = require("assert");

const SchnorrIdentificationScheme = require("./schemes/sis");
const OkamotoIdentificationScheme = require("./schemes/ois");
const ModifiedSchnorrIdentificationScheme = require("./schemes/msis");

const { generatePrivateAndPublicKeys } = require("./cryptography/keyGeneration.js")
const { CONFIG } = require("./config");
const operations = require("./cryptography/operations");

async function run() {
  await mcl.init(mcl.BLS12_381);
  // assert(testSIS());
  // assert(testOIS());
  assert(testMSIS());
}

function testSIS() {
  const parameters = {
    generator1: CONFIG.CONST_G1
  };

  const { privateKey, publicKey } = generatePrivateAndPublicKeys({ generator: parameters.generator1 });
  const SIS = new SchnorrIdentificationScheme(parameters);

  const { X, x } = SIS.generateCommitment();
  const c = SIS.generateChallenge();
  const proof = SIS.prove(x, privateKey, c);
  const isVerified = SIS.verify(publicKey, X, c, proof);
  return isVerified;
}


function testOIS() {
  const parameters = {
    generator1: CONFIG.CONST_G1,
    generator2: CONFIG.CONST_G2,
  };

  const keysG1 = generatePrivateAndPublicKeys({ generator: parameters.generator1 });
  const keysG2 = generatePrivateAndPublicKeys({ generator: parameters.generator2 });

  const a1 = keysG1.privateKey;
  const A1 = keysG1.publicKey;

  const a2 = keysG2.privateKey;
  const A2 = keysG2.publicKey;

  const A = operations.add(A1, A2);


  const OIS = new OkamotoIdentificationScheme(parameters);
  const { X, x1, x2 } = OIS.generateCommitment();
  const c = OIS.generateChallenge();

  // Prove
  const commitments = { x1, x2 };
  const privateKeys = { a1, a2 };
  const { s1, s2 } = OIS.prove(commitments, privateKeys, c);


  // Verify
  const transcript = { X, c, s1, s2 };
  const isVerified = OIS.verify(A, transcript);

  return isVerified;
}

function testMSIS() {
  const parameters = {
    generator1: CONFIG.CONST_G1
  };
  const { privateKey, publicKey } = generatePrivateAndPublicKeys({ generator: parameters.generator1 });
  const MSIS = new ModifiedSchnorrIdentificationScheme(parameters);

  const { X, x } = MSIS.generateCommitment();
  const c = MSIS.generateChallenge();

  // Prove
  const commitment = { X, x };
  const s = MSIS.prove(commitment, privateKey, c);


  // Verify
  const transcript = { X, c, s };
  const isVerified = MSIS.verify(publicKey, transcript);

  return isVerified;
}


run();
