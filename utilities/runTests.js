require('dotenv').config();
const { exec } = require('child_process');
const path = require('path');
const clearModifiedAlgorithms = require('./clearModifiedAlgorithms')


const runTests = async (randomAlgorithm,fileName) => {
  
    // Run the algorithm through jest
    // console.log("Help me debug the environment:",process.env.JEST_CONFIG_PATH);
    console.log(`we are in the .spec.js test file, This is the path to the current alorithm being tested ${randomAlgorithm.specPath}`); /// TODO WE WILL NEED TO UPDATE THIS WHEN WE INCLUDE NEW FOLDERS
    const testPath = randomAlgorithm.specPath;
    console.log("Starting Jest process....");
    const jestProcess = exec(`npx jest --config ${path.resolve(process.env.PROJECT_ROOT,process.env.JEST_CONFIG_PATH)} --testPathPattern ${testPath}`,
    { cwd: __dirname });
    console.log("Jest process started.");
    jestProcess.stdout.on('data', (data) => {
        console.log(data.toString());
    });
    jestProcess.stderr.on('data', (data) => {
        console.log(data.toString());
    });
    await new Promise((resolve, reject) => {
        jestProcess.on('close', (code) => {
            if (code === 0) {
                randomAlgorithm.passedTests = true;
                console.log(`Algorithm passed validation`);
                resolve(true);
            } else {
                randomAlgorithm.passedTests = false;
                console.log("Algorithm failed validation");
                resolve(false);
            }
        });
    });
    return randomAlgorithm.passedTests;
}
module.exports = runTests;
