const fs = require('fs');
const path = require('path');
const spawn = require('child_process').spawn;

function openAlgorithmEditor(randomAlgorithm, filePath, fileName, editor = 'vim') {
  
    if(fs.existsSync(filePath)){
      fs.unlinkSync(filePath);
    }

    console.log("Writing algorithm file to modified_algorithms folder...");
    fs.writeFileSync(filePath, `/**\n * ${randomAlgorithm.description}\n */\n\n${randomAlgorithm.func.toString()}`);
    const vim = spawn(editor, [filePath], {
        stdio: 'inherit'
    });

    //When Vim closes, read the file and update the randomAlgorithm.func
    vim.on('exit', async (code) => {
        try {
            // read the file
            const modifiedAlgorithm = fs.readFileSync(filePath, 'utf8');
            // Update the randomAlgorithm.func with the modified algorithm
            randomAlgorithm.func = new Function(modifiedAlgorithm);
        } catch(err) {
            console.error(`An error occurred while trying to read the modified algorithm from the file: ${err.message}`);
        }
    });
    return vim; 
}


module.exports = openAlgorithmEditor;
