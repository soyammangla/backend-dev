// server.js
const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true); // true => query as object
  const pathname = parsedUrl.pathname;

  if (req.method === "GET") {
    // Route: /
    if (pathname === "/") {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Welcome to my Node.js HTTP Server!");
    }

    // Route: /about
    else if (pathname === "/about") {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(`
        <html>
          <head>
            <title>About</title>
          </head>
          <body>
            <h1>About Us</h1>
            <p>This is a simple Node.js server built using the http module.</p>
          </body>
        </html>
      `);
    }

    // Route: /user?name=soyam&age=19
    else if (pathname === "/user") {
      const { name, age } = parsedUrl.query;

      const userData = {
        name: name || "Unknown",
        age: age || "Not provided",
      };

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(userData));
    }

    // Invalid routes
    else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 Page Not Found");
    }
  } else {
    // Only GET is supported
    res.writeHead(405, { "Content-Type": "text/plain" });
    res.end("Method Not Allowed");
  }
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
