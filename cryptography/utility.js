function getRandomBits(numberOfBits) {
  let bits = "";
  for (i = 0; i < numberOfBits; i++) {
    bits += randomInt(0, 1);
  }
  return bits;
}


module.exports = {
  getRandomBits
}
