const mcl = require("mcl-wasm");
const crypto = require("crypto");
const {CONFIG} = require("../config");


function add(g, x) {
    return mcl.add(g, x);
}

function sub(g, x) {
    return mcl.sub(g, x);
}

function mul(g, x) {
    return mcl.mul(g, x);
}

function div(g, x) {
    return mcl.div(g, x);
}

function generateG1(pointString) {
    const point = new mcl.G1();
    point.setStr(`1 ${pointString}`);
    return point;
}

function generateG2(pointString) {
    const point = new mcl.G2();
    point.setStr(`1 ${pointString}`);
    return point;
}

function getRandomScalar() {
    let r = new mcl.Fr();
    r.setByCSPRNG();
    return r;
}

function pairing(x, y) {
    return mcl.pairing(x, y);
}

function hashAndMapToG2(value) {
    return mcl.hashAndMapToG2(value);
}

function getHashOfValue(value, format='hex') {
    const hash = crypto.createHash('sha3-512');
    const digestedHash = hash.update(value).digest(format);
    const q = BigInt(CONFIG.r);
    const hashInt = BigInt('0x' + digestedHash);
    return (hashInt % q).toString();
}

function generateFr(scalarString) {
    const scalar = new mcl.Fr();
    scalar.setStr(scalarString);
    return scalar;
}


module.exports = {
    mul,
    generateG1,
    generateG2,
    getRandomScalar,
    add, 
    pairing,
    hashAndMapToG2,
    getHashOfValue,
    generateFr
}
