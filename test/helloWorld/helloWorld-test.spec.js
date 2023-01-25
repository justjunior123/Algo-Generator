require('dotenv').config();
const path = require('path');
const fs = require('fs');
const vm = require('vm');

const algorithmFolder = 'modified_algorithms';
///////////Change this Line for Descripion when copying and pasting/////////////
console.log("This is the helloWorld test file--------------------------------");
////////////////////////////////////////////////////////////////////////////////
// console.log('Show me what the files should look like:',process.env.PROJECT_ROOT, algorithmFolder);
const files = fs.readdirSync(path.join(process.env.PROJECT_ROOT, algorithmFolder));

console.log("We are in the helloWorld test folder:",files);

// Sort the files in descending order based on the timestamp
files.sort((a, b) => {
  return b.localeCompare(a);
});

const algorithmFile = files[0];

///USED to DEBUG
// console.log("This is the latest file:",algorithmFile);
// console.log("This is the path I am trying to read:",path.join(process.env.PROJECT_ROOT, algorithmFolder, algorithmFile, 'utf-8'));

const algorithmFileContent = fs.readFileSync(path.join(process.env.PROJECT_ROOT,algorithmFolder, algorithmFile), 'utf-8');

// create a new context
const context = vm.createContext({});

// run the code in the new context
vm.runInNewContext(algorithmFileContent, context);

// Get the exported function name
const latestAlgorithm = Object.values(context).find(val => typeof val === 'function');

// Help debug if issues
if(typeof latestAlgorithm !== 'function') {
    console.error(`latestAlgorithm is not a function, it is a ${typeof latestAlgorithm}`)
}
// USED to DEBUG
// console.log("contents inside the current file:",algorithmFileContent);
// console.log("This is the latest algorithm object",latestAlgorithm);

///////////Change this Line for Descripion when copying and pasting///////////
const pattern = /algorithm-helloWorld-.*\.js$/;
////////////////////////////////////////////////////////////////////////////////
const match = pattern.exec(algorithmFile);

if(match){
  console.log(`The file pattern matches a test!`)
} else {
  console.error(`The file name pattern does not match: ${algorithmFile}`)
}

if (match) {
  ///////////Change this Line for Descripion when copying and pasting///////////
  describe('helloWorld', () => {
  //////////////////////////////////////////////////////////////////////////////
    it('should return correct output for input "world"', () => {
      const input = "world";
      const expectedOutput = "Hello world";
      const output = latestAlgorithm(input);
      expect(output).toBe(expectedOutput);
    });
  });
}
