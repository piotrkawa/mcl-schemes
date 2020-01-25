const mcl = require("mcl-wasm");

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

function generateFr(scalarString) {
    const scalar = new mcl.Fr();
    scalar.setStr(scalarString);
    return scalar;
}

function getRandomScalar() {
    let r = new mcl.Fr();
    r.setByCSPRNG();
    return r;
}


module.exports = {
    mul,
    generateG1,
    generateG2,
    getRandomScalar,
    add
}
