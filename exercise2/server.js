const http = require("http");
const writeLog = require("./logger");

const PORT = 3000;

const server = http.createServer((req, res) => {
  writeLog(`Request received: ${req.method} ${req.url}`);

  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Logging server is running");
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
