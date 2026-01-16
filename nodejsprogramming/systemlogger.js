const os = require("os");
const fs = require("fs");

function logSystemInfo() {
  const log = `
Time: ${new Date().toLocaleTimeString()}
Platform: ${os.platform()}
CPU Cores: ${os.cpus().length}
Free Memory: ${(os.freemem() / 1024 / 1024).toFixed(2)} MB
-----------------------------
`;

  fs.appendFile("systemLog.txt", log, (err) => {
    if (err) console.error("Logging failed");
  });
}

// Log every 5 seconds
setInterval(logSystemInfo, 5000);
