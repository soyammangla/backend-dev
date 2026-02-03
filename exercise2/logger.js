const fs = require("fs");
const path = require("path");

const logFile = path.join(__dirname, "app.log");

function writeLog(message) {
  const time = new Date().toISOString();
  const logMessage = `[${time}] ${message}\n`;

  fs.appendFile(logFile, logMessage, () => {
    console.log("Log entry added");
  });
}

module.exports = writeLog;
