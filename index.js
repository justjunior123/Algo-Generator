require('dotenv').config();
const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');
const spawn = require('child_process').spawn;
const utils = require('./utilities');
const readline = require('readline');
        

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

        for (const randomAlgorithm of algorithms) {
            
            console.log(`This is the name of an algo in the folder currently: ${randomAlgorithm.path}`);
            ///
            Object.entries(randomAlgorithm).forEach(([key,value]) => {
                console.log(`\nThis is what the current Algorithm Object is: ${key} : ${value}`);
            })
            ///

            // Create a an new modified file to store and test modified algorithm
            const newModifiedFileName = `algorithm-${randomAlgorithm.name}-${new Date().getTime()}.js`
            const newModifiedFilePath = path.join(process.env.PROJECT_ROOT, "modified_algorithms", newModifiedFileName); // new
            console.log("Name of new algorithm file name vim will open:",{newModifiedFileName});
            // console.log("Name of the newModifiedFilePath where the new file will be created:",{newModifiedFilePath});

            // Open the text editor of choice to start the coding process of the current selected algorithm
            const vim = await utils.openAlgorithmEditor(randomAlgorithm, newModifiedFilePath, newModifiedFileName, editor);

            console.log("Entering the close block.....");
            await new Promise ((resolve) => {
                vim.on('exit', async (code) => {
                    
                    //Read the modified algorithm from the file
                    const modifiedAlgorithm = fs.readFileSync(path.join(process.env.PROJECT_ROOT, 'modified_algorithms', newModifiedFileName), 'utf8');
                    
                    //Update the randomAlgorithm.func with the modified algorithm
                    randomAlgorithm.func = new Function(modifiedAlgorithm);
                    
                    // Run the tests
                    testsPassed = await utils.runTests(randomAlgorithm, newModifiedFileName);
                    console.log(`Did the test pass? ${testsPassed}`);

                    // Set the testsPassed property on the randomAlgorithm object based on whether the tests passed or not
                    randomAlgorithm.testsPassed = testsPassed;
                    
                    if(testsPassed) {
                        tallyScore[1] += 1;
                        tallyScore[0] += 1;
                    } else {
                        tallyScore[0] += 1;
                    }
                    // Resolve the promise to continue the for loop
                    resolve();
                });
            });
        };
        
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