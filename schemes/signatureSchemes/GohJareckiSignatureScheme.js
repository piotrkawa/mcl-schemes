const SignatureScheme = require("../signatureSchemes/SignatureScheme");

class GohJareckiSignatureScheme extends SignatureScheme {
  
  constructor(parameters) {
    super();
    const { generator1 } = parameters;
    this.g = operations.generateG1(`${generator1.x} ${generator1.y}`);
  }


}

module.exports = GohJareckiSignatureScheme;
