require('dotenv').config();

const path = require('path');
const fs = require('fs');
const createUserInterface = require('./createUserInterface');


//Function to clear the modified_algorithms folder
const clearModifiedAlgorithms  = async () => {
    const rl = createUserInterface();
    const algorithmFolder = 'modified_algorithms';
    return new Promise((resolve, reject) => {
        const ask = (isFirstAttempt = true) => {
            rl.pause();
            rl.question(`Are you sure you want to clear the contents of the ${algorithmFolder} folder? (y/n)`, (answer) => {
                rl.resume();
                if (answer === 'y' || answer === 'n') {
                    if (answer === 'y') {
                        if (fs.existsSync(algorithmFolder)) {
                            fs.readdirSync(algorithmFolder).forEach(file => {
                                fs.unlinkSync(path.join(algorithmFolder, file));
                            });
                            console.log(`Contents of ${algorithmFolder} have been cleared`);
                            resolve();
                        } else {
                            console.log(`${algorithmFolder} does not exist`);
                            resolve();
                        }
                    } else if (answer === 'n') {
                        console.log(`Cancelled`);
                        resolve();
                    }
                } else {
                    if (!isFirstAttempt) {
                        console.log('Invalid input. Please enter "y" or "n".');
                    }
                    ask(false);
                }
            });
        };
        ask();
    });
};

module.exports = clearModifiedAlgorithms;
