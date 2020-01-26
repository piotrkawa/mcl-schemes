/**
 * @jest-environment node
 */

const mcl = require("mcl-wasm");
const operations = require("../cryptography/operations");
const SchnorrIdentificationScheme = require("../schemes/identificationSchemes/SchnorrIdentificationScheme");
const { generatePrivateAndPublicKeys } = require("../cryptography/keyGeneration.js")
const { CONFIG } = require("../config");
const assert = require("assert");


test('Performing correct identification', async () => {
  await mcl.init(mcl.BLS12_381);

  const parameters = {
    generator1: CONFIG.CONST_G1
  };

  const { privateKey, publicKey } = generatePrivateAndPublicKeys({ generator: parameters.generator1 });
  const SIS = new SchnorrIdentificationScheme(parameters);

  const { X, x } = SIS.generateCommitment();
  const c = SIS.generateChallenge();
  const proof = SIS.prove(x, privateKey, c);
  const isVerified = SIS.verify(publicKey, X, c, proof);
    assert(isVerified);
});
