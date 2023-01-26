require('dotenv').config();
const { exec } = require('child_process');
const path = require('path');


const runTests = async (randomAlgorithm,fileName) => {
  
    // Run the algorithm through jest
    // console.log("Help me debug the environment:",process.env.JEST_CONFIG_PATH);
    const testPath = `test/${randomAlgorithm.name}/${randomAlgorithm.name}-test.spec.js`;
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
