
const fs = require('fs');
const path = require('path');
const spawn = require('child_process').spawn;

function openAlgorithmEditor(randomAlgorithm, filePath, fileName, editor = 'vim', previousAttemptFilePath = null, attempts) {
  
    if(fs.existsSync(filePath)){
      fs.unlinkSync(filePath);
    }

    // console.log(`\nWe are looking at attempts: ${attempts}`);
    let modifiedAlgorithm = '';
    if (attempts === 1) {

        modifiedAlgorithm = `/**\n * ${randomAlgorithm.description}\n**/\n\n${randomAlgorithm.func.toString().replace(/^function\s*\(\s*\)\s*\{([\s\S]*)\}$/, '$1')}`;
        // console.log(`Golden Goose Egg: ${modifiedAlgorithm}`);
        fs.writeFileSync(filePath, modifiedAlgorithm);

    } else if (previousAttemptFilePath && attempts > 1) {

        console.log(`\n the previousAttemptFilePath: ${previousAttemptFilePath}`);
        let filepathToArray = filePath.split('/')
        filepathToArray.pop()
        filepathToArray.push(previousAttemptFilePath)
        let previousAttemptFilePathDir = filepathToArray.join('/')
        // console.log("working:",previousAttemptFilePathDir);
        const previousAttemptContent = fs.readFileSync(previousAttemptFilePathDir, 'utf8');
        // console.log(`Golden Goose Egg beyond previous function content: ${previousAttemptContent}`);
        fs.writeFileSync(filePath, previousAttemptContent);
    }
    

    //Opening The new text editor
    console.log("\nOpening the text editor.......");
    const vim = spawn(editor, [filePath], {
        stdio: 'inherit'
    });

    vim.on('exit', (code) => {
        const modifiedAlgorithm = fs.readFileSync(filePath, 'utf8');
        randomAlgorithm.func = new Function(modifiedAlgorithm);
        console.log("This is the new modified Algorithm:",randomAlgorithm.func);
    }); 

    return vim;
}
module.exports = openAlgorithmEditor;