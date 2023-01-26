require('dotenv').config();
const getRandomInt = require('./getRandomInt');
const createNewSessionFile = require('./createNewSessionFile.js');
const runTests = require('./runTests.js')
const clearModifiedAlgorithms = require('./clearModifiedAlgorithms.js')
const createUserInterface = require('./createUserInterface.js')
const readAlgorithms = require('./readAlgorithms.js');
const openAlgorithmEditor = require('./openAlgorithmEditor.js');

module.exports = {
  getRandomInt,
  createNewSessionFile,
  runTests,
  clearModifiedAlgorithms,
  createUserInterface,
  readAlgorithms,
  openAlgorithmEditor
};
