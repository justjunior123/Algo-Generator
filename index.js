const crypto = require('crypto');
const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');
const spawn = require('child_process').spawn;
const readline = require('readline');

//Function to generate random number
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(crypto.randomBytes(1).readUInt8() / 255 * (max - min + 1)) + min;
}

//Read all algorithm files
const algorithmFolder = 'algorithms';
let algorithms = [];
fs.readdirSync(path.join(__dirname, algorithmFolder)).forEach(file => {
  let algorithm = require(path.resolve(__dirname, algorithmFolder, file));
  algorithms.push({name:file.split(".")[0], func: algorithm});
});

// Select a random algorithm
const randomIndex = getRandomInt(0, algorithms.length - 1);
const randomAlgorithm = algorithms[randomIndex];
console.log("Selected Algorithm: ", randomAlgorithm.name)

// Open up a text editor for the user to enter the algorithm
const fileName = `algorithm-${randomAlgorithm.name}-${new Date().getTime()}.js`
fs.writeFileSync(fileName, randomAlgorithm.func.toString());
console.log("Name of new file where algorithm will open:",{fileName});
const vim = spawn('vim', [fileName], {
  stdio: 'inherit'
});

vim.on('close', async (code) => {
    console.log("vim has been closed");
    console.log(`child process exited with code ${code}`);
    console.log('File moved to modified_algorithms folder');
    console.log('The name of modified Code:', fileName)
    console.log('The file Path of modified Code:', path.join('modified_algorithms', fileName))
    // Read the algorithm file
    const algorithm = fs.readFileSync(fileName, 'utf8');

    // Create modified_algorithms folder if it doesn't exist
    if (!fs.existsSync('modified_algorithms')){
    await fs.mkdirSync('modified_algorithms');
    }
    // Move the file to modified_algorithms folder
    fs.rename(fileName, path.join('modified_algorithms', fileName), function (err) {
        if (err) throw err;
    });

    //Create inferface in order to read user input
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    // Ask user if they want to move the file to a session folder
    rl.question("Do you want to move the file to a session folder? (y/n) - ", async (answer) => {
        if (answer === "y") {
            const sessionName = "session-" + new Date().getTime();
            fs.mkdirSync(sessionName);

            // move the file to session folder
          await fs.rename(path.join('modified_algorithms', fileName), path.join(sessionName, fileName), function(err) {
                if (err) throw err;
                console.log(`File moved to session folder: ${sessionName}`);
            });
        }
        rl.close();
        await runTests();
    });
});


const runTests = async () => {
    // Run the algorithm through jest
    const jestProcess = exec(`npx jest --config jest.config.js --testMatch '**/*.spec.js'`,
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
