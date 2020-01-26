function getRandomBits(numberOfBits) {
  let bits = "";
  for (i = 0; i < numberOfBits; i++) {
    bits += randomInt(0, 1);
  }
  return bits;
}

function randomInt(low, high) {
  return Math.floor(Math.random() * (high - low + 1) + low);
}

module.exports = {
  getRandomBits
}
