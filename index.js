const { mul, init } = require("./cryptography/operations");
const SIS = require("./schemes/sis");
const mcl = require('mcl-wasm');

async function run() {
  await mcl.init(mcl.BLS12_381);
  // console.log(out);
}

run();

