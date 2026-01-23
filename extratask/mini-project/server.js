const http = require("http");
const fs = require("fs");
const { Transform } = require("stream");

const logStream = fs.createWriteStream("access.log", { flags: "a" });

function logRequest(req) {
  const log = `${new Date().toISOString()} | ${req.method} | ${req.url}\n`;
  logStream.write(log);
}

const upperCaseTransform = new Transform({
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  },
});

const vowelReplaceTransform = new Transform({
  transform(chunk, encoding, callback) {
    const result = chunk.toString().replace(/[aeiou]/gi, "*");
    this.push(result);
    callback();
  },
});

const server = http.createServer((req, res) => {
  logRequest(req);

  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    return res.end("Server is running");
  }

  if (req.method === "GET" && req.url === "/about") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    return res.end("This is the About page");
  }

  if (req.method === "GET" && req.url === "/user") {
    const user = {
      id: 1,
      name: "Soyam",
      role: "Developer",
    };

    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(user));
  }

  if (req.method === "POST" && req.url === "/uppercase") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    return req.pipe(upperCaseTransform).pipe(res);
  }

  if (req.method === "POST" && req.url === "/process") {
    res.writeHead(200, { "Content-Type": "text/plain" });

    return req.pipe(upperCaseTransform).pipe(vowelReplaceTransform).pipe(res);
  }

  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("404 - Route Not Found");
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
