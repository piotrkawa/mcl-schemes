const mcl = require("mcl-wasm");
const operations = require("../cryptography/operations");
const SIS = require("../schemes/sis");
const { generatePrivateAndPublicKeys } = require("../cryptography/keyGeneration.js")


beforeAll(async () => {
});

test('Performing correct identification', async () => {
  await mcl.init(mcl.BLS12_381);
  const { privateKey, publicKey } = generatePrivateAndPublicKeys();
  const { X, x } = SIS.generateCommitment();
  const c = SIS.generateChallenge();
  const proof = SIS.prove(x, privateKey, c);
  const isVerified = SIS.verify(publicKey, X, c, proof);
  expect(isVerified).toBe(true)
})