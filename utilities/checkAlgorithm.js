
//////////////////------------------------

const runTests = require('./runTests')
const openAlgorithmEditor = require('./openAlgorithmEditor')
const path = require('path');
const fs = require('fs');


const checkAlgorithm = async (randomAlgorithm, newModifiedFileName, editor = 'vim') => {
    const modifiedAlgorithmFilePath = path.join(process.env.PROJECT_ROOT, 'modified_algorithms', newModifiedFileName);
  
    // Open the text editor of choice to start the coding process of the current selected algorithm
    const vim = await openAlgorithmEditor(randomAlgorithm, modifiedAlgorithmFilePath, newModifiedFileName, editor);
  
    // Wait for the user to save and close the file before continuing
    await new Promise((resolve) => {
      vim.on('exit', () => {
        resolve();
      });
    });
  
    // Read the modified algorithm from the file
    const modifiedAlgorithm = fs.readFileSync(modifiedAlgorithmFilePath, 'utf8');
  
    // Update the randomAlgorithm.func with the modified algorithm
    randomAlgorithm.func = new Function(modifiedAlgorithm);
  
    // Run the tests
    const testsPassed = await runTests(randomAlgorithm, newModifiedFileName);
    console.log(`Did the test pass? ${testsPassed}`);
  
    // Set the testsPassed property on the randomAlgorithm object based on whether the tests passed or not
    randomAlgorithm.testsPassed = testsPassed;
  
    return testsPassed;
  };

  module.exports = checkAlgorithm;