const operations = require("../../cryptography/operations.js");


class ModifiedSchnorrIdentificationScheme {

  constructor(parameters) {
    const { generator1 } = parameters;
    this.g = operations.generateG1(`${generator1.x} ${generator1.y}`);
  }

  generateCommitment() {
    const x = operations.getRandomScalar();
    const X = operations.mul(this.g, x);
    return { X, x };
  }

  generateChallenge() {
    return operations.getRandomScalar();
  }

  prove(commitment, a, c) {
    const { X, x } = commitment;
    const gHat = operations.hashAndMapToG2(X.getStr(10).slice(2) + c.getStr(10));
    const exponent = operations.add(x, operations.mul(a, c));
    return operations.mul(gHat, exponent);
  }

  verify(A, transcript) {
    const { X, c, s } = transcript;
    const gHat = operations.hashAndMapToG2(X.getStr(10).slice(2) + c.getStr(10));
    const XAc = operations.add(X, operations.mul(A, c));

    const leftSide = operations.pairing(this.g, s)
    const rightSide = operations.pairing(XAc, gHat)

    return leftSide.getStr() === rightSide.getStr();
  }
}

module.exports = ModifiedSchnorrIdentificationScheme
