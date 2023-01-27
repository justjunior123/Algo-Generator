require('dotenv').config();
const getRandomInt = require('./getRandomInt');

const runTests = require('./runTests.js')
const clearModifiedAlgorithms = require('./clearModifiedAlgorithms.js')
const createUserInterface = require('./createUserInterface.js')
const readAlgorithms = require('./readAlgorithms.js');
const openAlgorithmEditor = require('./openAlgorithmEditor.js');
const selectTextEditorChoice = require('./selectTextEditorChoice');

module.exports = {
  getRandomInt,
  runTests,
  clearModifiedAlgorithms,
  createUserInterface,
  readAlgorithms,
  openAlgorithmEditor,
  selectTextEditorChoice
};
