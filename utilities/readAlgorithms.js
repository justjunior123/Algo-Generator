const fs = require('fs');
const path = require('path');

function readAlgorithms(algorithmFolder) {
  let algorithms = [];
  fs.readdirSync(path.join(process.env.PROJECT_ROOT, algorithmFolder)).forEach(file => {
    let algorithm = require(path.resolve(process.env.PROJECT_ROOT, algorithmFolder, file));
    let algorithmDescription = (algorithm.description) ? algorithm.description : "No description provided";
    algorithms.push({name:file.split(".")[0], func: algorithm.func, description: algorithmDescription});
  });
  return algorithms;
}

module.exports = readAlgorithms;
