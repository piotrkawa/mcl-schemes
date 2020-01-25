const { mul, add, generateG1, getRandomScalar } = require("../cryptography/operations.js");

class SchnorrIdentificationScheme {

  constructor(parameters) {
    const { generatorG1 } = parameters;
    this.g = generateG1(`${generatorG1.x} ${generatorG1.y}`);
  }

  generateCommitment() {
    const x = getRandomScalar();
    const X = mul(this.g, x);
    return { X, x };
  }

  generateChallenge() {
    const c = getRandomScalar();
    return c;
  }

  prove(x, a, c) {
    const ac = mul(a, c);
    const s = add(ac, x);
    return s;
  }

  verify(A, X, c, s) {
    const leftSide = mul(this.g, s);
    const rightSide = add(X, mul(A, c));
    return leftSide.getStr() === rightSide.getStr();
  }
}

module.exports = SchnorrIdentificationScheme

