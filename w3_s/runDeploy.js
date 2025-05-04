const { exec } = require('child_process');

// Function to run the deploy:transfer script
function runDeployTransfer() {
      // Run the shell command
  exec('npm run deploy:transfer', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }

    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }

    console.log(`stdout: ${stdout}`);
  });
};


// runDeployTransfer();
module.exports = {runDeployTransfer}