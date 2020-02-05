const { generatePrivateAndPublicKeys } = require("./cryptography/keyGeneration.js");
const ModifiedSchnorrIdentificationScheme = require("./schemes/identificationSchemes/ModifiedSchnorrIdentificationScheme");
const { initialize, Curves } = require("./init");
const assert = require("assert");


async function runMSIS() {
  await initialize(Curves.BLS12_381); // example runs on BLS12_381

  const parameters = {
    generator1: {
      x: '3685416753713387016781088315183077757961620795782546409894578378688607592378376318836054947676345821548104185464507',
      y: '1339506544944476473020471379941921221584933875938349620426543736416511423956333506472724655353366534992391756441569'
    }
  };
  // Init 
  const { privateKey, publicKey } = generatePrivateAndPublicKeys({ generator: parameters.generator1 });
  const MSIS = new ModifiedSchnorrIdentificationScheme(parameters);
  
  // P sends commitment
  const { X, x } = MSIS.generateCommitment();
  
  // V sends challenge
  const c = MSIS.generateChallenge();

  // P sends a proof
  const commitment = { X, x };
  const s = MSIS.prove(commitment, privateKey, c);

  // V verifies
  const transcript = { X, c, s };
  const isVerified = MSIS.verify(publicKey, transcript);

  assert(isVerified);
  console.log(`Verified: ${isVerified}`)
}

runMSIS()