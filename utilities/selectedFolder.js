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

  let selectedFolders = [];

  const cleanup = () => {
    if (rl) { // check if rl interface exists before closing it
      rl.close();
    }
    process.stdin.removeAllListeners('SIGINT'); // remove the SIGINT listener
  };


  process.on('SIGINT', () => {
    cleanup();
    process.exit();
  });

  while (true) {
    console.log('Select an algorithm folder (or type "done" to finish selecting):\n');
    algorithmFolders.forEach((folder, index) => {
      console.log(`${index + 1}. ${folder}`);
    });

    const answer = await new Promise((resolve) => {
      rl.question('\nEnter the folder number: ', (answer) => {
        resolve(answer.trim());
      });
    });

    if (answer.toLowerCase() === 'done') {
      break;
    }

    const selectedFolderIndex = parseInt(answer) - 1;

    if (isNaN(selectedFolderIndex) || selectedFolderIndex < 0 || selectedFolderIndex >= algorithmFolders.length) {
      console.log(`Invalid folder number: ${selectedFolderIndex + 1}`);
    } else if (selectedFolders.includes(algorithmFolders[selectedFolderIndex])) {
      console.log(`Folder "${algorithmFolders[selectedFolderIndex]}" is already selected.`);
    } else {
      selectedFolders.push(algorithmFolders[selectedFolderIndex]);
      console.log(`"${algorithmFolders[selectedFolderIndex]}" added to selected folders.`);
    }
  }

  cleanup();

  if (selectedFolders.length === 0) {
    console.log('No folders selected.');
    return [];
  } else {
    console.log('Folders selected:', selectedFolders);
    return selectedFolders;
  }
}

module.exports = selectedFolder;
