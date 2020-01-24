const mcl = require("mcl-wasm");
const { mul, generateG1, getRandomScalar } = require("../cryptography/operations"); 
const { CONFIG } = require("../config");

// async function SIS() {
//     X, A, c, s = prove();
//     return verify(A,X,c,s);
// }

async function verify(A, X, c, s) {
    return g^ s === XA^c
}

async function prove() {
    X, x = generateCommitment();
    challenge = generateChallenge();
    return generateResponse
}

async function generateCommitment() {
    const g = await generateG1(`${CONFIG.CONST_G1.x} ${CONFIG.CONST_G1.y}`);
    const x = await getRandomScalar();
    const X = await mul(g, x);
    return {X, x};
}

async function generateChallenge() {
    const c = await getRandomScalar();
    return c;
}

async function generateResponse(x, a, c) {
    const ac = await mul(a, c);
    const s = await add(ac, x);    
    return s;
}

module.exports = { generateCommitment, generateChallenge, generateResponse }
