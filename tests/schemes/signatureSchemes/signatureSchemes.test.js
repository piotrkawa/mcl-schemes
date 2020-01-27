const assert = require("assert");

const SchnorrSignatureScheme = require("../../../schemes/signatureSchemes/SchnorrSignatureScheme");
const GohJareckiSignatureScheme = require("../../../schemes/signatureSchemes/GohJareckiSignatureScheme");
const { generatePrivateAndPublicKeys } = require("../../../cryptography/keyGeneration")
const { CONFIG } = require("../../../config");
const { initialize, Curves } = require("../../../init");


beforeAll(async () => {
  await initialize(Curves.BLS12_381);
});

test('Performing correct Schnorr Signature Scheme', () => {

  const parameters = {
    generator1: CONFIG.CONST_G1
  };

  const { privateKey, publicKey } = generatePrivateAndPublicKeys({ generator: parameters.generator1 });
  const SSS = new SchnorrSignatureScheme(parameters);

  const message = "123";
  const sigma = SSS.generateSignature(message, privateKey);
  const isVerified = SSS.verifySignature(message, publicKey, sigma);
  assert(isVerified);

});


test('Performing correct Goh Jarecki Signature Scheme', () => {
  const parameters = {
    generator1: CONFIG.CONST_G1
  };

  const keys = generatePrivateAndPublicKeys({ generator: parameters.generator1 });

  const GJSS = new GohJareckiSignatureScheme(parameters);

  const message = "123";
  const sigma = GJSS.generateSignature(message, keys);
  const isVerified = GJSS.verifySignature(message, keys.publicKey, sigma);
  assert(isVerified);
});