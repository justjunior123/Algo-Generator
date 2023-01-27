const readline = require('readline');
const choices = ['1','2','3']// <-----This needs to be the input; Used for example

const selectedChoice = async (choices) => {
    return new Promise((resolve, reject) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        let selectedIndex = 0;

        // Display the choices
        for (let i = 0; i < choices.length; i++) {
            console.log(`${i + 1}. ${choices[i]}`);
        }

        // Handle key presses
        rl.on('line', (input) => {
            switch (input) {
                case '\u001B\u005B\u0041': // Up arrow
                    selectedIndex = Math.max(selectedIndex - 1, 0);
                    break;
                case '\u001B\u005B\u0042': // Down arrow
                    selectedIndex = Math.min(selectedIndex + 1, choices.length - 1);
                    break;
                case '\r': // Enter
                    rl.close();
                    resolve(choices[selectedIndex]);
                    break;
                default:
                    break;
            }
        });
    });
}
module.exports = selectedChoice;