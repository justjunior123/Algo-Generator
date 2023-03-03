const fs = require('fs');
const path = require('path');

function readAlgorithms(selectedFolder) {

  const algorithmFolder = path.join(process.env.PROJECT_ROOT,'/algorithms/',selectedFolder);
  console.log("This is what we are looking at:", algorithmFolder);
  return new Promise((resolve, reject) => {
    try {
      let algorithms = [];
      fs.readdirSync(algorithmFolder).forEach(file => {
        if(!file.includes("test") && !file.includes("spec")){
          let algorithm = require(path.resolve(algorithmFolder, file));
          let algorithmDescription = (algorithm.description) ? algorithm.description : "No description provided";
          let algorithmName = file.split(".")[0];

          algorithms.push({
            name: algorithmName, 
            func: algorithm.func, 
            description: algorithmDescription,
            path: algorithmFolder,
            specPath: path.join(`${algorithmFolder}`,`${algorithmName}-test.spec.js`)
          });
        }
      });
      resolve(algorithms);
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = readAlgorithms;


