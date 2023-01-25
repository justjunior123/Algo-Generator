require('dotenv').config();
const getRandomInt = require('./getRandomInt');
const createNewSessionFile = require('./createNewSessionFile.js');
const runTests = require('./runTests.js')
const clearModifiedAlgorithms = require('./clearModifiedAlgorithms.js')
const createUserInterface = require('./createUserInterface.js')

module.exports = {
  getRandomInt,
  createNewSessionFile,
  runTests,
  clearModifiedAlgorithms,
  createUserInterface
};
