require('dotenv').config();
const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');
const spawn = require('child_process').spawn;
const utils = require('./utilities')

//Read all algorithm files
const algorithmFolder = 'algorithms';
let algorithms = [];
fs.readdirSync(path.join(__dirname, algorithmFolder)).forEach(file => {
  let algorithm = require(path.resolve(__dirname, algorithmFolder, file));
  let algorithmDescription = (algorithm.description) ? algorithm.description : "No description provided";
  algorithms.push({name:file.split(".")[0], func: algorithm.func, description: algorithmDescription});
});


// Select a random algorithm
const randomIndex = utils.getRandomInt(0, algorithms.length - 1);
const randomAlgorithm = algorithms[randomIndex];
console.log("Selected Algorithm: ", randomAlgorithm.name)
console.log("Algorithm Description: ", randomAlgorithm.description)

//++++++++++++++++++++++++++++++working code
// const randomIndex = utils.getRandomInt(0, algorithms.length - 1);
// const randomAlgorithm = algorithms[randomIndex];
// console.log("Selected Algorithm: ", randomAlgorithm.name)

// Open up a text editor for the user to enter the algorithm
const fileName = `algorithm-${randomAlgorithm.name}-${new Date().getTime()}.js`
fs.writeFileSync(fileName, `/**\n * ${randomAlgorithm.description}\n */\n\n${randomAlgorithm.func.toString()}`);
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
    const rl = utils.createUserInterface();

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
        await utils.runTests(randomAlgorithm);
    });
});
