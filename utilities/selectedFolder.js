const fs = require('fs');
const path = require('path');
const readline = require('readline');

async function selectedFolder() {
  const algorithmFolders = fs.readdirSync(path.join(process.env.PROJECT_ROOT, 'algorithms'));
  if (algorithmFolders.length === 0) {
    console.log('No algorithm folders found.');
    return [];
  }
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log('Select an algorithm folder:\n');
  algorithmFolders.forEach((folder, index) => {
    console.log(`${index + 1}. ${folder}`);
});

const selectedFolderIndex = await new Promise((resolve) => {
    rl.question('\nEnter the folder number: ', (answer) => {
      rl.close();
      resolve(parseInt(answer) - 1);
    });
  });

  if (isNaN(selectedFolderIndex) || selectedFolderIndex < 0 || selectedFolderIndex >= algorithmFolders.length) {
    console.log(`Invalid folder number: ${selectedFolderIndex + 1}`);
    return [];
  }
  debugger
  console.log("Heelp",[algorithmFolders[selectedFolderIndex]])
  return [algorithmFolders[selectedFolderIndex]];

}

module.exports = selectedFolder;
