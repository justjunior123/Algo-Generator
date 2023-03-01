const readline = require('readline');

const createUserInterface = () => {
  const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false
  });

  return rl;
};
module.exports = createUserInterface;