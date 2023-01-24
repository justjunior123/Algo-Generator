/// The following works for testing against the algorithm in the algorithms folder
// const algorithm1 = require(path.resolve(__dirname, '..', 'algorithms', 'algorithm1'));
///
// const path = require('path');
// const fs = require('fs');
// const algorithmFolder = 'modified_algorithms';
// const files = fs.readdirSync(path.join(process.cwd(), algorithmFolder));
// console.log("We are in the modified_algorithms folder:",files);
//
// // Sort the files in descending order based on the timestamp
// files.sort((a, b) => {
//   return b.localeCompare(a);
// });
//
// const algorithmFile = files[0];
// console.log("This is the latest file:",algorithmFile);
// console.log("This is the joined path:",path.resolve(process.cwd(), algorithmFolder, algorithmFile))
// const latestAlgorithm = require(path.resolve(process.cwd(), algorithmFolder, algorithmFile));
// // Help debug if issues
// if(typeof latestAlgorithm !== 'function') {
//     console.error(`latestAlgorithm is not a function, it is a ${typeof latestAlgorithm}`)
// }
// console.log("contents inside the current file:",fs.readFileSync(path.resolve(process.cwd(), algorithmFolder, algorithmFile), 'utf-8'));
// console.log("This is the latest algorithm object",latestAlgorithm)
//
// test('algorithm1 should return correct output for input "world"', () => {
//     const input = "world";
//     const expectedOutput = "Hello world";
//     const output = latestAlgorithm(input);
//     expect(output).toBe(expectedOutput);
// });
//
// module.exports = test;

///////Works!//////////
// const path = require('path');
// const fs = require('fs');
// const algorithmFolder = 'modified_algorithms';
// const files = fs.readdirSync(path.join(process.cwd(), algorithmFolder));
// console.log("We are in the modified_algorithms folder:",files);
//
// // Sort the files in descending order based on the timestamp
// files.sort((a, b) => {
//   return b.localeCompare(a);
// });
//
// const algorithmFile = files[0];
// console.log("This is the latest file:",algorithmFile);
// console.log("This is the joined path:",path.resolve(process.cwd(), algorithmFolder, algorithmFile))
// const algorithmFileContent = fs.readFileSync(path.resolve(process.cwd(), algorithmFolder, algorithmFile), 'utf-8');
// eval(algorithmFileContent);
// const latestAlgorithm = algorithm1;
// // Help debug if issues
// if(typeof latestAlgorithm !== 'function') {
//     console.error(`latestAlgorithm is not a function, it is a ${typeof latestAlgorithm}`)
// }
// console.log("contents inside the current file:",algorithmFileContent);
// console.log("This is the latest algorithm object",latestAlgorithm)
//
// test('algorithm1 should return correct output for input "world"', () => {
//     const input = "world";
//     const expectedOutput = "Hello world";
//     const output = latestAlgorithm(input);
//     expect(output).toBe(expectedOutput);
// });
//
// module.exports = test;
/////////////////
// const path = require('path');
// const fs = require('fs');
// const vm = require('vm');
// const algorithmFolder = 'modified_algorithms';
// const files = fs.readdirSync(path.join(process.cwd(), algorithmFolder));
// console.log("We are in the modified_algorithms folder:",files);
//
// // Sort the files in descending order based on the timestamp
// files.sort((a, b) => {
//   return b.localeCompare(a);
// });
//
// const algorithmFile = files[0];
// console.log("This is the latest file:",algorithmFile);
// console.log("This is the joined path:",path.resolve(process.cwd(), algorithmFolder, algorithmFile))
// const algorithmFileContent = fs.readFileSync(path.resolve(process.cwd(), algorithmFolder, algorithmFile), 'utf-8');
//
// // create a new context
// const context = vm.createContext({});
//
// // run the code in the new context
// vm.runInNewContext(algorithmFileContent, context);
//
// const latestAlgorithm = context.algorithm1;
//
// // Help debug if issues
// if(typeof latestAlgorithm !== 'function') {
//     console.error(`latestAlgorithm is not a function, it is a ${typeof latestAlgorithm}`)
// }
// console.log("contents inside the current file:",algorithmFileContent);
// console.log("This is the latest algorithm object",latestAlgorithm)
//
// test('algorithm1 should return correct output for input "world"', () => {
//     const input = "world";
//     const expectedOutput = "Hello world";
//     const output = latestAlgorithm(input);
//     expect(output).toBe(expectedOutput);
// });
//
// module.exports = test;

//////////////WORKS!

/////
const path = require('path');
const fs = require('fs');
const vm = require('vm');
const algorithmFolder = 'modified_algorithms';
const files = fs.readdirSync(path.join(process.cwd(), algorithmFolder));
console.log("We are in the modified_algorithms folder:",files);

// Sort the files in descending order based on the timestamp
files.sort((a, b) => {
  return b.localeCompare(a);
});

const algorithmFile = files[0];
console.log("This is the latest file:",algorithmFile);
console.log("This is the joined path:",path.resolve(process.cwd(), algorithmFolder, algorithmFile))
const algorithmFileContent = fs.readFileSync(path.resolve(process.cwd(), algorithmFolder, algorithmFile), 'utf-8');

// create a new context
const context = vm.createContext({});

// run the code in the new context
vm.runInNewContext(algorithmFileContent, context);

// run the code in the new context
vm.runInNewContext(algorithmFileContent, context);
const functionName = algorithmFile.split('-')[1];

const latestAlgorithm = context.algorithm1;

// Help debug if issues
if(typeof latestAlgorithm !== 'function') {
    console.error(`latestAlgorithm is not a function, it is a ${typeof latestAlgorithm}`)
}
console.log("contents inside the current file:",algorithmFileContent);
console.log("This is the latest algorithm object",latestAlgorithm)

test('algorithm1 should return correct output for input "world"', () => {
    const input = "world";
    const expectedOutput = "Hello world";
    const output = latestAlgorithm(input);
    expect(output).toBe(expectedOutput);
});

module.exports = test;
