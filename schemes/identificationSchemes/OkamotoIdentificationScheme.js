const operations = require("../../cryptography/operations.js");
const IdentificationScheme = require("./IdentificationScheme");

class OkamotoIdentificationScheme extends IdentificationScheme {

  constructor(parameters) {
    super();
    const { generator1, generator2 } = parameters;
    this.g1 = operations.generateG1(`${generator1.x} ${generator1.y}`);
    this.g2 = operations.generateG1(`${generator2.x} ${generator2.y}`);
  }

  generateCommitment() {
    const x1 = operations.getRandomScalar();
    const X1 = operations.mul(this.g1, x1);
    const x2 = operations.getRandomScalar();
    const X2 = operations.mul(this.g2, x2);
    const X = operations.add(X1, X2);
    return { X, x1, x2 };
  }

  generateChallenge() {
    return operations.getRandomScalar();
  }

  prove(commitments, privateKeys, c) {
    const { x1, x2 } = commitments;
    const { a1, a2 } = privateKeys;

    const ac1 = operations.mul(a1, c);
    const ac2 = operations.mul(a2, c);
    const s1 = operations.add(ac1, x1);
    const s2 = operations.add(ac2, x2);
    return { s1, s2 };
  }

  verify(keys, transcript) {
    const A  = keys;
    const { X, c, s1, s2 } = transcript;

    const gs1 = operations.mul(this.g1, s1);
    const gs2 = operations.mul(this.g2, s2);

    const leftSide = operations.add(gs1, gs2)
    const rightSide = operations.add(X, operations.mul(A, c));
    return leftSide.getStr() === rightSide.getStr()
  }
}

module.exports = OkamotoIdentificationScheme;