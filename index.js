require('dotenv').config();
const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');
const spawn = require('child_process').spawn;
const utils = require('./utilities')

//Read all algorithm files, form selected Folder. TODO: Access Multiple folders
    const algorithmFolder = 'algorithms';
    let algorithms = utils.readAlgorithms(algorithmFolder);

// Select a random algorithm
    const randomIndex = utils.getRandomInt(0, algorithms.length - 1);
    const randomAlgorithm = algorithms[randomIndex];
    console.log("Selected Algorithm: ", randomAlgorithm.name)
    console.log("Algorithm Description: ", randomAlgorithm.description)

// Open up a text editor for the user to enter the algorithm
    const fileName = `algorithm-${randomAlgorithm.name}-${new Date().getTime()}.js`
    const filepath = path.join(process.env.PROJECT_ROOT, "modified_algorithms", fileName); // new
    // fs.writeFileSync(path.join(process.env.PROJECT_ROOT, "modified_algorithms", fileName), `/**\n * ${randomAlgorithm.description}\n */\n\n${randomAlgorithm.func.toString()}`);
    console.log("Name of new file and path where algorithm will open:",{fileName});

//Open vim using the random algorithm generated.
    const vim = utils.openAlgorithmEditor(randomAlgorithm,filepath);

vim.on('close', async (code) => {
    //Read the modified algorithm from the file
    const modifiedAlgorithm = fs.readFileSync(filepath, 'utf8');
    //Update the randomAlgorithm.func with the modified algorithm
    randomAlgorithm.func = new Function(modifiedAlgorithm);

    //Create inferface in order to read user input
    const rl = utils.createUserInterface();
    rl.close();
    await utils.runTests(randomAlgorithm,fileName);
});

