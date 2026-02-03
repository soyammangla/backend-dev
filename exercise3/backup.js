const fs = require("fs");
const path = require("path");

function createBackup(filePath) {
  const dir = path.dirname(filePath);
  const ext = path.extname(filePath);
  const name = path.basename(filePath, ext);

  const now = new Date();
  const timestamp =
    now.getFullYear() +
    "-" +
    String(now.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(now.getDate()).padStart(2, "0") +
    "_" +
    String(now.getHours()).padStart(2, "0") +
    "-" +
    String(now.getMinutes()).padStart(2, "0") +
    "-" +
    String(now.getSeconds()).padStart(2, "0");

  const backupFile = path.join(dir, `${name}_${timestamp}${ext}`);

  fs.copyFile(filePath, backupFile, () => {
    console.log("Backup created:", backupFile);
  });
}

module.exports = createBackup;
