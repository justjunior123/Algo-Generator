const runTests = require('./runTests')
const openAlgorithmEditor = require('./openAlgorithmEditor')
const path = require('path');
const fs = require('fs');

const checkAlgorithm = async (randomAlgorithm, modifiedFileName, editor = 'vim', maxAttempts = 3, attempts = 0) => {
    const modifiedAlgorithmFilePath = path.join(process.env.PROJECT_ROOT, 'modified_algorithms', modifiedFileName);
    let testsPassed = null;
    let previousMainFunctionBody = '';
    // Open the text editor of choice to start the coding process of the current selected algorithm
    const vim = await openAlgorithmEditor(randomAlgorithm, modifiedAlgorithmFilePath, modifiedFileName, editor);
    
    // Wait for the user to save and close the file before continuing
    await new Promise((resolve) => {
      vim.on('exit', () => {
        resolve();
      });
    });
    
    // Read the modified algorithm from the file
    let modifiedAlgorithm = fs.readFileSync(modifiedAlgorithmFilePath, 'utf8');

   // -----------------
    // Find the main function and replace its contents with the modified algorithm
    let mainFunctionRegex = /function\s+main\s*\([\s\S]*?\)\s*{([\s\S]*?)\n\s*}/;
    modifiedAlgorithm = modifiedAlgorithm.replace(mainFunctionRegex, (match, mainFunctionBody) => {
        let updatedMainFunctionBody = '';
        if (previousMainFunctionBody) {
            updatedMainFunctionBody = `${previousMainFunctionBody}\n${mainFunctionBody}`;
        } else {
            updatedMainFunctionBody = mainFunctionBody;
        }
        previousMainFunctionBody = updatedMainFunctionBody;
        return `function main() {\n${randomAlgorithm.func.toString()}\n${updatedMainFunctionBody}\n}`;
    });

    // -----------------
    
    // Update the randomAlgorithm.func with the modified algorithm
    randomAlgorithm.func = new Function(modifiedAlgorithm);
    
    // Run the tests
    testsPassed = await runTests(randomAlgorithm, modifiedFileName);
    console.log(`Did the test pass? ${testsPassed}`);
    
    if (testsPassed) {
      // Save the modified file with the same name and path, and overwrite the existing file if it already exists
      fs.writeFileSync(modifiedAlgorithmFilePath, modifiedAlgorithm, { flag: 'w' });
    } else if (attempts === maxAttempts) {
      console.log(`Maximum number of attempts (${maxAttempts}) reached. Giving up on ${randomAlgorithm.path}`);
      return testsPassed;
    }
  
    // Set the testsPassed property on the randomAlgorithm object based on whether the tests passed or not
    randomAlgorithm.testsPassed = testsPassed;
  
    return testsPassed;
  };

  module.exports = checkAlgorithm;
