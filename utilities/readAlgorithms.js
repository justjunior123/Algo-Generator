const fs = require('fs');
const path = require('path');

function readAlgorithms(selectedFolder) {
  const algorithmFolder = path.join(process.env.PROJECT_ROOT,'/algorithms', ...selectedFolder);
  console.log("This is what we are looking at:", algorithmFolder);
  return new Promise((resolve, reject) => {
    try {
      let algorithms = [];
      fs.readdirSync(algorithmFolder).forEach(file => {
        if(!file.includes("test") && !file.includes("spec")){
          let algorithm = require(path.resolve(algorithmFolder, file));
          let algorithmDescription = (algorithm.description) ? algorithm.description : "No description provided";
          algorithms.push({name:file.split(".")[0], func: algorithm.func, description: algorithmDescription});
        }
      });
      console.log("HERE ARE THE ALGORITHMS THAT WERE CHOSEN:",algorithms)
      resolve(algorithms);
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = readAlgorithms;


