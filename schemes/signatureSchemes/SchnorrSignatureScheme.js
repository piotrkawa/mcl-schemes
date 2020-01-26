const operations = require("../../cryptography/operations.js");
const SignatureScheme = require("./SignatureScheme");

class SchnorrSignatureScheme extends SignatureScheme {

  constructor(parameters) {
    super();
    const { generator1 } = parameters;
    this.g = operations.generateG1(`${generator1.x} ${generator1.y}`);
  }

  generateSignature(message, a) {
    const { X, x } = this._generateCommitment();
    const c = this._generateChallenge(message, X);
    const s = this._generateProof(x, a, c);
    return { s, X }
  }

  verifySignature(message, A, sigma) {
    const { s, X } = sigma;
    const c = this._generateChallenge(message, X);
    const leftSide = operations.mul(this.g, s);
    const rightSide = operations.add(X, operations.mul(A, c));
    return leftSide.getStr() === rightSide.getStr();
  }

  _generateProof(x, a, c) {
    const ac = operations.mul(a, c);
    return operations.add(ac, x);
  }

  _generateCommitment() {
    const x = operations.getRandomScalar();
    const X = operations.mul(this.g, x);
    return { X, x };
  }

  _generateChallenge(message, X) {
    const intValue = operations.getHashOfValue(message + X.getStr(10).slice(2));
    return operations.generateFr(intValue);
  }
}

module.exports = SchnorrSignatureScheme
