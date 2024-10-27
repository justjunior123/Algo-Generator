require('dotenv').config();
const path = require('path');
const fs = require('fs');
const vm = require('vm');
const algorithmFolder = 'algorithms';

///////////Change this Line for Descripion when copying and pasting/////////////
console.log("This is the helloWorld test file--------------------------------");
////////////////////////////////////////////////////////////////////////////////

console.log("Verify Path to algorithms folder:",path.join(process.env.PROJECT_ROOT, algorithmFolder));
const modifiedAlgorithmFiles = fs.readdirSync(path.join(process.env.PROJECT_ROOT, "modified_algorithms"));
console.log("We are in the modified_algorithms folder:",modifiedAlgorithmFiles);

// Sort the modifiedAlgorithmFiles in the MODIFIED ALGORITHMS folder, in descending order based on the timestamp
modifiedAlgorithmFiles.sort((a, b) => {
  return b.localeCompare(a);
});

const currentModifiedAlgorithmFile = modifiedAlgorithmFiles[0];

///USED to DEBUG
// console.log("This is the latest file that should have the latest timestamp:",currentModifiedAlgorithmFile);
// console.log("This is the path I am trying to read:",path.join(process.env.PROJECT_ROOT, algorithmFolder, currentModifiedAlgorithmFile, 'utf-8'));

const algorithmFileContent = fs.readFileSync(path.join(process.env.PROJECT_ROOT, 'modified_algorithms', currentModifiedAlgorithmFile), 'utf-8');

// create a new context
const context = vm.createContext({ module: module, exports: undefined, require: undefined });

// run the code in the new context
vm.runInNewContext(algorithmFileContent, context);
// Get the exported function name
const currentAlgorithmInTest = Object.values(context).find(val => typeof val === 'function');

// Help debug if issues
if(typeof currentAlgorithmInTest !== 'function') {
  console.error(`currentAlgorithmInTest is not a function, it is a ${typeof currentAlgorithmInTest}`)
}
// USED to DEBUG
// console.log("contents inside the current file:",algorithmFileContent);
// console.log("This is the latest algorithm object",currentAlgorithmInTest);

///////////Change this Line for Descripion when copying and pasting///////////
const pattern = /algorithm-helloWorldStrings-.*\.js$/;
////////////////////////////////////////////////////////////////////////////////
const match = pattern.exec(currentModifiedAlgorithmFile);
// console.log("WHAT ARE WE MATCHING:",match);
if(match){
  console.log(`The file pattern matches a test!`)
} else {
  console.error(`The file name pattern does not match: ${currentModifiedAlgorithmFile}`)
}

if (match) {
  ///////////Change this Line for Descripion when copying and pasting///////////
  describe('helloWorld', () => {
  //////////////////////////////////////////////////////////////////////////////
    it('should return correct output for input "World"', () => {
      const input = "World";
      const expectedOutput = "Hello World";
      const output = currentAlgorithmInTest(input);
      expect(output).toBe(expectedOutput);
    });
  });
}
