require('dotenv').config();
const { exec } = require('child_process');
const path = require('path');


const runTests = async (randomAlgorithm,fileName) => {
  
    // Run the algorithm through jest
    // console.log("Help me debug the environment:",process.env.JEST_CONFIG_PATH);
    console.log("we are in the .spec.js test file for HELLO WORLD"); /// TODO WE WILL NEED TO UPDATE THIS WHEN WE INCLUDE NEW FOLDERS
    const testPath = `algorithms/${randomAlgorithm.name}-test.spec.js`;
    console.log("MAKE SURE THE TEST PATH IS WHAT IS EXPECTED:", testPath);
    const jestProcess = exec(`npx jest --config ${path.resolve(process.env.PROJECT_ROOT,process.env.JEST_CONFIG_PATH)} --testPathPattern ${testPath}`,
    { cwd: __dirname });
    jestProcess.stdout.on('data', (data) => {
        console.log(data.toString());
    });
    jestProcess.stderr.on('data', (data) => {
        console.log(data.toString());
    });
    jestProcess.on('close', (code) => {
        if (code === 0) {
            console.log("Algorithm passed validation");
        } else {
            console.log("Algorithm failed validation");
        }
    });
}
module.exports = runTests;
