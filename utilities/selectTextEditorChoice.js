const readline = require('readline');
const keypress = require('keypress');

const selectTextEditorChoice = async (editor) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  keypress(process.stdin);
  process.stdin.setRawMode(true);

  let choices = ['nano', 'vi', 'vim', 'emacs'];
  let index = 0;
  console.log(`Select an editor:`);
  console.log(`  ${choices.join('\n  ')}`);

  let selectedEditor;
  process.stdin.on('keypress', (ch, key) => {
    if (key.name === 'up') {
      index--;
      if (index < 0) {
        index = choices.length - 1;
      }
      console.log("\033c");
      console.log(`Select an editor:`);
      console.log(`  ${choices.join('\n  ')}`);
    } else if (key.name === 'down') {
      index++;
      if (index === choices.length) {
        index = 0;
      }
      console.log("\033c");
      console.log(`Select an editor:`);
      console.log(`  ${choices.join('\n  ')}`);
    } else if (key.name === 'return') {
      selectedEditor = choices[index];
      rl.close();
    }
  });

  process.stdin.on('end', () => {
    process.stdout.write('end');
  });

  await new Promise(resolve => rl.on('close', resolve));
  process.stdin.setRawMode(false);
  return selectedEditor;
}
module.exports = selectTextEditorChoice;
