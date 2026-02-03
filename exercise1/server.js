const http = require("http");
const userData = require("./user");

const PORT = 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(userData));
});

server.listen(PORT, () => {
  console.log(`Server running on port 3000`);
});
