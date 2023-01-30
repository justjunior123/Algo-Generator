const crypto = require('crypto');

//Function to generate random number
function getRandomInt(min, max) {
  return new Promise((resolve, reject) => {
    try {
      min = Math.ceil(min);
      max = Math.floor(max);
      const randomInt = Math.floor(crypto.randomBytes(1).readUInt8() / 255 * (max - min + 1)) + min;
      resolve(randomInt);
    } catch (err) {
      reject(err);
    }
  });
}
module.exports = getRandomInt;

