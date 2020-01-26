const SignatureScheme = require("../signatureSchemes/SignatureScheme");
const operations = require("../../cryptography/operations");
const { getRandomBits } = require("../../cryptography/utility");

class GohJareckiSignatureScheme extends SignatureScheme {

  constructor(parameters) {
    super();
    const { generator1 } = parameters;
    this.g = operations.generateG1(`${generator1.x} ${generator1.y}`);
  }

  generateSignature(message, keys) {
    const a = keys.privateKey;
    const A = keys.publicKey;

    let r = getRandomBits(110);
    r = '1' + r;
    const h = operations.hashAndMapToG1(message + r);
    const z = operations.mul(h, a);

    const k = operations.getRandomScalar();

    const u = operations.mul(this.g, k);
    const v = operations.mul(h, k);

    const c = operations.generateFr(this._hashPrim(this.g, h, A, z, u, v));

    const cx = operations.mul(a, c);
    const s = operations.add(k, cx);
    return { s, c, z, r };
  }

  verifySignature(message, A, sigma) {
    const { s, c, z, r } = sigma;

    const h = operations.hashAndMapToG1(message + r);

    const gs = operations.mul(this.g, s);
    const yc = operations.mul(A, c);
    const u = operations.sub(gs, yc);

    const hs = operations.mul(h, s);
    const zc = operations.mul(z, c);
    const v = operations.sub(hs, zc);

    let cPrim = this._hashPrim(this.g, h, A, z, u, v);
    cPrim = operations.generateFr(cPrim);

    return cPrim.getStr() == c.getStr();
  }

  _hashPrim(...hashArguments) {
    const concatenatedArguments = hashArguments.reduce((total, element) => {
      return total += element.getStr(10).slice(2)
    }, "")
    return operations.getHashOfValue(concatenatedArguments);
  }
}

module.exports = GohJareckiSignatureScheme;
