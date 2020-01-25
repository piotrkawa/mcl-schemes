const operations = require("../cryptography/operations.js");

class SchnorrSignatureScheme {

  /* 
  function computeC(msg, X) { 
      const inner = msg + X.getStr(10).slice(2);
      const intValue = utilityService.getHashOfValue(inner);
      return mclService.generateFr(intValue);
  }

  async function verifySignature(payload) {
      const A = mclService.generateG1(payload.A);
      const X = mclService.generateG1(payload.X);
      const s = mclService.generateFr(payload.s);
      const msg = payload.msg;
      const c = computeC(msg, X);    
      const g = mclService.getGroupGeneratorG1();

      const leftSide = mcl.mul(g, s);
      const rightSide = mcl.add(X, mcl.mul(A, c));

      return leftSide.getStr() === rightSide.getStr();
  }

  function generateSignature(message, secretKey)      {
      const g = mclService.getGroupGeneratorG1();
      const x = mclService.getRandomScalar();
      const X = mcl.mul(g, x);

      const c = computeC(message, X);
      const s = mcl.add(x, mcl.mul(secretKey, c));

      return {
          s: s.getStr(10),
          A: X.getStr(10).slice(2),
          msg: message
      }
  }
  */
  constructor(parameters) {
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
