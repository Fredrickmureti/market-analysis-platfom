const { spawn } = require('child_process');

const getPredictions = async (prices) => {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn('python', ['arima_predictor.py']);

    pythonProcess.stdin.write(JSON.stringify({ prices }));
    pythonProcess.stdin.end();

    let data = '';
    pythonProcess.stdout.on('data', (chunk) => {
      data += chunk.toString();
    });

    pythonProcess.stderr.on('data', (chunk) => {
      console.error(`stderr: ${chunk}`);
    });

    pythonProcess.on('close', (code) => {
      if (code !== 0) {
        return reject(new Error(`Python script exited with code ${code}`));
      }
      try {
        const result = JSON.parse(data);
        if (result.error) {
          return reject(new Error(result.error));
        }
        resolve(result);
      } catch (e) {
        reject(new Error('Failed to parse prediction data'));
      }
    });
  });
};

module.exports = {
  getPredictions,
};