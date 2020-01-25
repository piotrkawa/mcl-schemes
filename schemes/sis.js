const operations = require("../cryptography/operations.js");


class SchnorrIdentificationScheme {

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

  prove(x, a, c) {
    const ac = operations.mul(a, c);
    const s = operations.add(ac, x);
    return s;
  }

  verify(A, X, c, s) {
    const leftSide = operations.mul(this.g, s);
    const rightSide = operations.add(X, operations.mul(A, c));
    return leftSide.getStr() === rightSide.getStr();
  }
}

module.exports = SchnorrIdentificationScheme

