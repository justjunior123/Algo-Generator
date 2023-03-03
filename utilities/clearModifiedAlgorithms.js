require('dotenv').config();

const path = require('path');
const fs = require('fs');
const createUserInterface = require('./createUserInterface');
const askQuestion = require('./askQuestion')

const clearModifiedAlgorithms = async () => {
  const rl = createUserInterface();
  const algorithmFolder = 'modified_algorithms';
  while (true) {
    try {
      const answer = await askQuestion(`\n Are you sure you want to clear the contents of the ${algorithmFolder} folder? (y/n): `,rl);
      if (answer === 'y') {
        if (fs.existsSync(algorithmFolder)) {
          fs.readdirSync(algorithmFolder).forEach(file => {
            fs.unlinkSync(path.join(algorithmFolder, file));
          });
          console.log(`\n Contents of ${algorithmFolder} have been cleared`);
        } else {
          console.log(`${algorithmFolder} does not exist`);
        }
        break;
      } else if (answer === 'n') {
        console.log(`Cancelled`);
        break;
      }
      console.log('\n Invalid input. Please enter "y" or "n": ');
    } catch (error) {
      console.error(error);
      break;
    }
  }
};

module.exports = clearModifiedAlgorithms;
  