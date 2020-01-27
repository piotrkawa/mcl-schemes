# mcl-schemes

The following repository contains the following cryptographic schemes implemented in JavaScript using [mcl-wasm](https://github.com/herumi/mcl-wasm).

## Currently supported schemes

Identification Schemes:
* Schnorr Identification Scheme
* Modified Schnorr Identification Scheme
* Okamoto Identification Scheme

Signature Schemes:
* Schnorr Signature Scheme
* Goh Jarecki Signature Scheme

## Currently supported curves:
* BLS12_381
* BN_SNARK1
* BN462
* BN381_1
* BN254


## Example

```javascript
const { generatePrivateAndPublicKeys } = require("cryptography/keyGeneration.js");
const SchnorrSignatureScheme = require("schemes/signatureSchemes/SchnorrSignatureScheme");
const operations = require("cryptography/operations");
const { initialize, Curves } = require("init");


await initialize(Curves.BLS12_381);

const parameters = {
  generator1: {
   x: '3685416753713387016781088315183077757961620795782546409894578378688607592378376318836054947676345821548104185464507',
   y: '1339506544944476473020471379941921221584933875938349620426543736416511423956333506472724655353366534992391756441569'
  }
};

const { privateKey, publicKey } = generatePrivateAndPublicKeys({ generator: parameters.generator1 });
const SSS = new SchnorrSignatureScheme(parameters);

const message = "My name is Barack Obama, I'm the president of United States of America";
const sigma = SSS.generateSignature(message, privateKey);
const isVerified = SSS.verifySignature(message, publicKey, sigma);
```

## TODO:
* Add more convenient imports
* Publish on npm
* Add support for multiple elliptic curves
* Refactor
* Implement more schemes including:
  * Boneh-Lynn-Shacham Signature Scheme
  * Naxos Authenticated Key Exchange
  * Sigma Authenticated Key Exchange
