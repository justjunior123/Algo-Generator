
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
    if (key && key.name === 'up') {
      index--;
      if (index < 0) {
        index = choices.length - 1;
      }
      updateChoices();
    } else if (key && key.name === 'down') {
      index++;
      if (index === choices.length) {
        index = 0;
      }
      updateChoices();
    } else if (key && key.name === 'return') {
      rl.close();
    }
  });

  process.stdin.on('end', () => {
    process.stdout.write('end');
  });

  const cleanup = () => {
    rl.close();
    process.stdin.setRawMode(false);
  };

  try {
    await new Promise(resolve => rl.on('close', resolve));
    return choices[index];
  } catch (err) {
    console.error(err);
  } finally {
    cleanup();
  }
};

module.exports = selectTextEditorChoice;