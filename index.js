const mcl = require('mcl-wasm');
const assert = require("assert");

const SchnorrIdentificationScheme = require("./schemes/identificationSchemes/SchnorrIdentificationScheme");
const OkamotoIdentificationScheme = require("./schemes/identificationSchemes/OkamotoIdentificationScheme");
const ModifiedSchnorrIdentificationScheme = require("./schemes/identificationSchemes/ModifiedSchnorrIdentificationScheme");
const SchnorrSignatureScheme = require("./schemes/signatureSchemes/SchnorrSignatureScheme");

const GohJareckiSignatureScheme = require("./schemes/signatureSchemes/GohJareckiSignatureScheme");

const { generatePrivateAndPublicKeys } = require("./cryptography/keyGeneration.js")
const { CONFIG } = require("./config");
const operations = require("./cryptography/operations");

async function run() {
  await mcl.init(mcl.BLS12_381);

  assert(testSSS());
  assert(testSIS());
  assert(testOIS());
  assert(testMSIS());
  assert(testGJSS());
}

function testGJSS() {
  const parameters = {
    generator1: CONFIG.CONST_G1
  };

  const keys = generatePrivateAndPublicKeys({ generator: parameters.generator1 });

  const GJSS = new GohJareckiSignatureScheme(parameters);

  const message = "123";
  const sigma = GJSS.generateSignature(message, keys);
  const isVerified = GJSS.verifySignature(message, keys.publicKey, sigma);
  return isVerified;
}

function testSSS() {
  const parameters = {
    generator1: CONFIG.CONST_G1
  };

  const { privateKey, publicKey } = generatePrivateAndPublicKeys({ generator: parameters.generator1 });
  const SSS = new SchnorrSignatureScheme(parameters);

  const message = "123";
  const sigma = SSS.generateSignature(message, privateKey);
  const isVerified = SSS.verifySignature(message, publicKey, sigma);
  return isVerified;
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
