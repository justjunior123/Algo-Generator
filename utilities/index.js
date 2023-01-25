require('dotenv').config();
const getRandomInt = require('./getRandomInt');
const createNewSessionFile = require('./createNewSessionFile.js');
const runTests = require('./runTests.js')

module.exports = {
  getRandomInt,
  createNewSessionFile,
  runTests
};
