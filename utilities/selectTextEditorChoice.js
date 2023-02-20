// const readline = require('readline');
// const keypress = require('keypress');

// const selectTextEditorChoice = async () => {
//   const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
//   });

//   const choices = ['nano', 'vi', 'vim', 'emacs'];
//   let selectedEditor = null;
//   let selectedIndex = 0;
//   console.log(`Select an editor:`);
//   choices.forEach((choice, index) => {
//     console.log(`${index === selectedIndex ? '-> ' : '   '}${choice}`);
//   });

//   keypress(process.stdin);
//   process.stdin.setRawMode(true);

//   process.stdin.on('keypress', (ch, key) => {
//     if (key.name === 'up') {
//       selectedIndex = Math.max(selectedIndex - 1, 0);
//       readline.moveCursor(process.stdout, 0, -1);
//       readline.clearLine(process.stdout);
//       choices.forEach((choice, index) => {
//         console.log(`${index === selectedIndex ? '-> ' : '   '}${choice}`);
//       });
//     } else if (key.name === 'down') {
//       selectedIndex = Math.min(selectedIndex + 1, choices.length - 1);
//       readline.moveCursor(process.stdout, 0, 1);
//       readline.clearLine(process.stdout);
//       choices.forEach((choice, index) => {
//         console.log(`${index === selectedIndex ? '-> ' : '   '}${choice}`);
//       });
//     } else if (key.name === 'return') {
//       selectedEditor = choices[selectedIndex];
//       rl.close();
//     }
//   });

//   await new Promise(resolve => rl.on('close', resolve));
//   process.stdin.setRawMode(false);

//   return selectedEditor;
// };

// module.exports = selectTextEditorChoice;





const readline = require('readline');
const keypress = require('keypress');

const selectTextEditorChoice = async () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  keypress(process.stdin);
  process.stdin.setRawMode(true);

  const choices = ['nano', 'vi', 'vim'];
  let index = 0;

  const updateChoices = () => {
    const displayChoices = choices.map((choice, i) => {
      return index === i ? `-> ${choice}` : `   ${choice}`;
    }).join('\n');

    rl.write('\u001Bc');
    rl.write(`Select an editor:\n${displayChoices}\n`);
  };

  updateChoices();

  process.stdin.on('keypress', (ch, key) => {
    if (key.name === 'up') {
      index--;
      if (index < 0) {
        index = choices.length - 1;
      }
      updateChoices();
    } else if (key.name === 'down') {
      index++;
      if (index === choices.length) {
        index = 0;
      }
      updateChoices();
    } else if (key.name === 'return') {
      rl.close();
    }
  });

  process.stdin.on('end', () => {
    process.stdout.write('end');
  });

  await new Promise(resolve => rl.on('close', resolve));
  process.stdin.setRawMode(false);
  return choices[index];
};

module.exports = selectTextEditorChoice;

