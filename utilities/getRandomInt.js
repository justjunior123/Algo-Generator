const crypto = require('crypto');

//Function to generate random number
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(crypto.randomBytes(1).readUInt8() / 255 * (max - min + 1)) + min;
}
module.exports = getRandomInt;
