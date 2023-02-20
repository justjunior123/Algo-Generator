require('dotenv').config();
const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');
const spawn = require('child_process').spawn;
const utils = require('./utilities')
        

const main = async () => {
    
    const editor = await utils.selectTextEditorChoice();
    console.log(`Selected Editor: ${editor}`);

    //Read all algorithm files, from selected Folder, return a promise. TODO: Access Multiple folders
    const algorithmFolder = 'algorithms';
    let algorithms = await utils.readAlgorithms(algorithmFolder);

    
    // Select a random index, return a promise.
    let randomIndex = await utils.getRandomInt(0, algorithms.length - 1);
    const randomAlgorithm = algorithms[randomIndex];
    console.log("Selected Algorithm: ", randomAlgorithm.name)
    console.log("Algorithm Description: ", randomAlgorithm.description)

    // Open up a text editor for the user to enter the algorithm
    const newModifiedFileName = `algorithm-${randomAlgorithm.name}-${new Date().getTime()}.js`
    const newModifiedFilePath = path.join(process.env.PROJECT_ROOT, "modified_algorithms", newModifiedFileName); // new
    console.log("Name of new algorithm file name vim will open:",{newModifiedFileName});
    console.log("Name of the newModifiedFilePath where the new file will be created:",{newModifiedFilePath});

    
    //Open vim using the random algorithm generated.
    const vim = await utils.openAlgorithmEditor(randomAlgorithm, newModifiedFilePath, newModifiedFileName, editor);

    console.log("Entering the close block.....");
    vim.on('exit', async (code) => {
        // Create inferface in order to read user input
        const rl = utils.createUserInterface();
        //Read the modified algorithm from the file
        console.log("Vim closed with the code:" + code);
        const modifiedAlgorithm = fs.readFileSync(path.join(process.env.PROJECT_ROOT, 'modified_algorithms', newModifiedFileName), 'utf8');
        
        //Update the randomAlgorithm.func with the modified algorithm
        randomAlgorithm.func = new Function(modifiedAlgorithm);
        await utils.runTests(randomAlgorithm,newModifiedFileName);
        rl.close();
        
        // await utils.clearModifiedAlgorithms();
    });
    
}
main();