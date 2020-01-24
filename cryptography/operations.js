const mcl = require("mcl-wasm");

async function add(g, x) {
    return mcl.add(g, x);
}

function sub(g, x) {
    return mcl.sub(g, x);
}

async function mul(g, x) {
    return mcl.mul(g, x);
}

function div(g, x) {
    return mcl.div(g, x);
}

async function generateG1(pointString) {
    // await mcl.init(mcl.BLS12_381);
    const point = new mcl.G1();
    point.setStr(`1 ${pointString}`);
    return point;
}

function generateG2(pointString) {
    const point = new mcl.G2();
    point.setStr(`1 ${pointString}`);
    return point;
}

function generateFr(scalarString) {
    const scalar = new mcl.Fr();
    scalar.setStr(scalarString);
    return scalar;
}

async function getRandomScalar() {
    let r = new mcl.Fr();
    r.setByCSPRNG();
    return r;
}


module.exports = {
    mul,
    init,
    generateG1,
    getRandomScalar
}
