require('dotenv').config();

const path = require('path');
const fs = require('fs');

//Function to clear the modified_algorithms folder
const clearModifiedAlgorithms = () => {
    const algorithmFolder = 'modified_algorithms';
    if (fs.existsSync(algorithmFolder)) {
        fs.readdirSync(algorithmFolder).forEach(file => {
            fs.unlinkSync(path.join(algorithmFolder, file));
        });
        console.log(`Contents of ${algorithmFolder} have been cleared`);
    }
}
module.exports = clearModifiedAlgorithms;
