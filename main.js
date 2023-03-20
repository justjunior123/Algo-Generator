require('dotenv').config();
const path = require('path');
const utils = require('./utilities');

const main = async () => {
    const tallyScore = [0,0];
    const editor = await utils.selectTextEditorChoice();
    console.log(`Selected Editor: ${editor}`);
    try {
        //Read all algorithm files, from selected Folder, return a promise.
        const selectedFolders = await utils.selectedFolder();
        let algorithms = [];
        for (const folder of selectedFolders) {
            const folderAlgorithms = await utils.readAlgorithms(folder);
            algorithms = algorithms.concat(folderAlgorithms);
            // 1. TODO: Select only certain amount of algorithms
            // 2. TODO: Randomize the algorithms
        }
        
        
        const maxAttempts = 2;
        for (const randomAlgorithm of algorithms) {
        
            console.log(`This is the name of an algo in the folder currently: ${randomAlgorithm.path}`);

            let attempts = 0;
            let testsPassed = false;
            let modifiedFileName = `algorithm-${randomAlgorithm.name}-attempt${attempts}.js`;

            while (attempts < maxAttempts && !testsPassed) {
                attempts++;
                console.log(`Current attempt ${attempts}`);
                modifiedFileName = `algorithm-${randomAlgorithm.name}-attempt${attempts}.js`;
                testsPassed = await utils.checkAlgorithm(randomAlgorithm, modifiedFileName, editor, maxAttempts, attempts);
                console.log(`------------------------------------------------------------------------------------------------`);
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