const fs = require('fs');
const path = require('path');
const spawn = require('child_process').spawn;

function openAlgorithmEditor(randomAlgorithm, fileName) {
    // Open up a text editor for the user to enter the algorithm
    newModifiedAlgoFilename = `algorithm-${randomAlgorithm.name}-${new Date().getTime()}.js`
    const filepath = path.join(process.env.PROJECT_ROOT, 'modified_algorithms', newModifiedAlgoFilename);
    if(fs.existsSync(filepath)){
      fs.unlinkSync(filepath);
    }
    console.log("Writing algorithm file to modified_algorithms folder...");
    fs.writeFileSync(filepath, `/**\n * ${randomAlgorithm.description}\n */\n\n${randomAlgorithm.func.toString()}`);
    const vim = spawn('vim', [filepath], {
        stdio: 'inherit'
    });

    //When Vim closes, read the file and update the randomAlgorithm.func
    vim.on('exit', async (code) => {
        try {
            // read the file
            const modifiedAlgorithm = fs.readFileSync(filepath, 'utf8');
            // Update the randomAlgorithm.func with the modified algorithm
            randomAlgorithm.func = new Function(modifiedAlgorithm);
            if(await moveToSession() === 'y') {
                const newPath = path.join(process.env.PROJECT_ROOT, 'session_algorithms', newModifiedAlgoFilename)
                fs.rename(filepath, newPath, (err) => {
                    if (err) {
                        console.log('Error moving file: ' + err);
                        return
                    }
                    console.log('Moved file to session folder')
                });
            }
        } catch(err) {
            console.error(`An error occurred while trying to read the modified algorithm from the file: ${err.message}`);
        }
    });
    return vim; 
}


module.exports = openAlgorithmEditor;
