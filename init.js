const mcl = require("mcl-wasm");

const Curves = Object.freeze({
  BLS12_381: mcl.BLS12_381,
  BN_SNARK1: mcl.BN_SNARK1,
  BN462: mcl.BN462,
  BN381_1: mcl.BN381_1,
  BN254: mcl.BN254
});

async function initialize(curve = Curves.BLS12_381) {
  await mcl.init(curve);
}

module.exports = { initialize, Curves }
