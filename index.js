require('dotenv').config();
const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');
const spawn = require('child_process').spawn;
const utils = require('./utilities')
        
    //Read all algorithm files, from selected Folder. TODO: Access Multiple folders
    const algorithmFolder = 'algorithms';
    let algorithms = utils.readAlgorithms(algorithmFolder);

    //Select text editor
    // let editor;
    // const selectedEditor = async () => {
    //     editor = await utils.selectTextEditorChoice();
    //     console.log("Editor Selected:",editor);
    // }

    // const main = async () => {
        // await selectedEditor();

        // Select a random algorithm from the folder
        const randomIndex = utils.getRandomInt(0, algorithms.length - 1);
        const randomAlgorithm = algorithms[randomIndex];
        console.log("Selected Algorithm: ", randomAlgorithm.name)
        console.log("Algorithm Description: ", randomAlgorithm.description)

        // Open up a text editor for the user to enter the algorithm
        const newModifiedFileName = `algorithm-${randomAlgorithm.name}-${new Date().getTime()}.js`
        const newModifiedFilePath = path.join(process.env.PROJECT_ROOT, "modified_algorithms", newModifiedFileName); // new
        console.log("Name of new algorithm file name vim will open:",{newModifiedFileName});
        console.log("Name of the newModifiedFilePath where the new file will be created:",{newModifiedFilePath});

        
        //Open vim using the random algorithm generated.
        const vim = utils.openAlgorithmEditor(randomAlgorithm, newModifiedFilePath, newModifiedFileName, "vim");

        vim.on('close', async (code) => {
            //Read the modified algorithm from the file
            const modifiedAlgorithm = fs.readFileSync(path.join(process.env.PROJECT_ROOT, 'modified_algorithms', newModifiedFileName), 'utf8');
            
            //Update the randomAlgorithm.func with the modified algorithm
            randomAlgorithm.func = new Function(modifiedAlgorithm);

            //Create inferface in order to read user input
            const rl = utils.createUserInterface();
            rl.close();
            await utils.runTests(randomAlgorithm,newModifiedFileName);
            // utils.clearModifiedAlgorithms(); TODO: What for tests to finish before clearing the folder
        });
    // }    