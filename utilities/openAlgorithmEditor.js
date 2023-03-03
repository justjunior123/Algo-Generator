const fs = require('fs');
const path = require('path');
const spawn = require('child_process').spawn;

function openAlgorithmEditor(randomAlgorithm, filePath, fileName, editor = 'vim') {
  
    if(fs.existsSync(filePath)){
      fs.unlinkSync(filePath);
    }

    console.log("\nWriting algorithm file to modified_algorithms folder...");
    fs.writeFileSync(filePath, `/**\n * ${randomAlgorithm.description}\n */\n\n${randomAlgorithm.func.toString().replace(/^function\s*\(\s*\)\s*\{([\s\S]*)\}$/, '$1')}`);

    //Opening The new text editor
    console.log("Opening the text editor.......");
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


//-------------------------------original

// const fs = require('fs');
// const path = require('path');
// const spawn = require('child_process').spawn;

// function openAlgorithmEditor(randomAlgorithm, filePath, fileName, editor = 'vim') {
  
//     if(fs.existsSync(filePath)){
//       fs.unlinkSync(filePath);
//     }

//     console.log("\nWriting algorithm file to modified_algorithms folder...");
//     fs.writeFileSync(filePath, `/**\n * ${randomAlgorithm.description}\n */\n\n${randomAlgorithm.func.toString()}`);
//     //Opening The new text editor
//     console.log("Opening the text editor.......");
//     const vim = spawn(editor, [filePath], {
//         stdio: 'inherit'
//     });

//     vim.on('exit', (code) => {
//         const modifiedAlgorithm = fs.readFileSync(filePath, 'utf8');
//         randomAlgorithm.func = new Function(modifiedAlgorithm);
//         console.log("This is the new modified Algorithm:",randomAlgorithm.func);
//     }); 

//     return vim;
// }
// module.exports = openAlgorithmEditor;
