const path = require('path');
const algorithm1 = require(path.resolve(__dirname, '..', 'algorithms', 'algorithm1'));

test('algorithm1 should return correct output for input "world"', () => {
    const input = "world";
    const expectedOutput = "Hello, world!";
    const output = algorithm1(input);
    expect(output).toBe(expectedOutput);
});

module.exports = test;
