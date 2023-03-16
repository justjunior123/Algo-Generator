require('dotenv').config();
const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');
const spawn = require('child_process').spawn;
const utils = require('./utilities');
const readline = require('readline');
const checkAlgorithm = require('./utilities/checkAlgorithm');
        

const main = async () => {
    const tallyScore = [0,0];
    const editor = await utils.selectTextEditorChoice();
    console.log(`Selected Editor: ${editor}`);
    try {
        //Read all algorithm files, from selected Folder, return a promise. TODO: Access Multiple folders
        const selectedFolders = await utils.selectedFolder();
        let algorithms = [];
        for (const folder of selectedFolders) {
            const folderAlgorithms = await utils.readAlgorithms(folder);
            algorithms = algorithms.concat(folderAlgorithms);
        }
        
        // TODO: Randomize the algorithms
        
        const maxAttempts = 1;
        for (const randomAlgorithm of algorithms) {
        
            console.log(`This is the name of an algo in the folder currently: ${randomAlgorithm.path}`);

            let attempts = 0;
            let testsPassed = false;
            let modifiedFileName = `algorithm-${randomAlgorithm.name}-attempt${attempts}.js`;

            while (attempts < maxAttempts && !testsPassed) {
                attempts++;
                modifiedFileName = `algorithm-${randomAlgorithm.name}-attempt${attempts}.js`;
                testsPassed = await checkAlgorithm(randomAlgorithm, modifiedFileName, editor, maxAttempts, attempts);
                console.log(`------------------------------------------------------------------------------------------------`);
                console.log(`Inside the while loop: ${testsPassed}`);
                console.log(`Inside  the while loop attempt: ${attempts}`);
            }
        
            if (testsPassed) {
                tallyScore[1] += 1;
            }
            tallyScore[0] += 1;
        }
    } catch (error) {
        //Handles any leftover errors
        console.error(error);
    } finally {
        // Clean up resources here
        console.log("Clearing the modified algorithms.....");
        await (async () => {
            try {
            await utils.clearModifiedAlgorithms();
            } catch (error) {
            console.error(error);
            }
            console.log(`Total number of algorithms passed: ${tallyScore[1]} / ${tallyScore[0]}`);
            process.exit();
        })();
    }
}
main();