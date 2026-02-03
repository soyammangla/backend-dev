const http = require("http");
const createBackup = require("./backup");

const PORT = 3000;

const server = http.createServer((req, res) => {
  if (req.url === "/backup") {
    createBackup("./source.txt");
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Backup created successfully");
  } else {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Server is running");
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
