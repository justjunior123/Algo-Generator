// TODO: We need to try to import this entire function into index.js and be able to call
// the function to create a new session folder. The function would get called inside of
// the vim.on("close") code block;

// rl.question("Do you want to create a new session? (y/n) - ", async (answer) => {
//     if (answer === "y") {
//         const sessionName = "session-" + new Date().getTime();
//         fs.mkdirSync(sessionName);
//
//         // move the file to session folder
//         fs.rename(fileName, path.join(sessionName, fileName), function(err) {
//             if (err) throw err;
//             console.log('File moved to session folder');
//         });
//     } else {
//         fs.unlinkSync(fileName);
//     }
//     rl.close();
// });
