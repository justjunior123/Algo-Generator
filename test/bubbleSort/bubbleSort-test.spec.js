

const path = require('path');
const fs = require('fs');
const vm = require('vm');
const algorithmFolder = 'modified_algorithms';
///////////Change this Line for Descripion when copying and pasting/////////////
console.log("This is the bubbleSort test file--------------------------------");
////////////////////////////////////////////////////////////////////////////////

const files = fs.readdirSync(path.join(process.cwd(), algorithmFolder));
console.log("We are in the modified_algorithms folder:",files);

// Sort the files in descending order based on the timestamp
files.sort((a, b) => {
  return b.localeCompare(a);
});

const algorithmFile = files[0];
console.log("This is the latest file:",algorithmFile);
console.log("This is the joined path:",path.resolve(__dirname, '..', algorithmFolder, algorithmFile))
const algorithmFileContent = fs.readFileSync(path.resolve(process.cwd(), algorithmFolder, algorithmFile), 'utf-8');

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
console.log("contents inside the current file:",algorithmFileContent);
console.log("This is the latest algorithm object",latestAlgorithm)

///////////Change this Line for Descripion when copying and pasting///////////
const pattern = /algorithm-bubbleSort-*/;
////////////////////////////////////////////////////////////////////////////////
const match = pattern.exec(algorithmFile);

if(match){
  console.log(`The file pattern matches a test!`)
} else {
  console.error(`The file name pattern does not match: ${algorithmFile}`)
}

if (match) {
  ///////////Change this Line for Descripion when copying and pasting///////////
  describe('bubbleSort', () => {
  //////////////////////////////////////////////////////////////////////////////
    it('should return correct output for input "world"', () => {
      const input = "world";
      const expectedOutput = "Hello world";
      const output = latestAlgorithm(input);
      expect(output).toBe(expectedOutput);
    });
  });
} else {
  console.log("Skipping test file, no matching algorithm teset found");
}

module.exports = test;
