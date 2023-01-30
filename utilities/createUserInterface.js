const readline = require('readline');

const createUserInterface = () => {
  const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
  });

  return rl;
};
module.exports = createUserInterface;