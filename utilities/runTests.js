require('dotenv').config();
const { exec } = require('child_process');
const path = require('path');
const clearModifiedAlgorithms = require('./clearModifiedAlgorithms')


const runTests = async (randomAlgorithm,fileName) => {
  
    // Run the algorithm through jest
    // console.log("Help me debug the environment:",process.env.JEST_CONFIG_PATH);
    console.log("we are in the .spec.js test file for HELLO WORLD"); /// TODO WE WILL NEED TO UPDATE THIS WHEN WE INCLUDE NEW FOLDERS
    const testPath = `algorithms/${randomAlgorithm.name}-test.spec.js`;
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
                console.log("Algorithm passed validation");
                resolve();
            } else {
                console.log("Algorithm failed validation");
                resolve();
            }
        });
    });
    await clearModifiedAlgorithms();
}
module.exports = runTests;
