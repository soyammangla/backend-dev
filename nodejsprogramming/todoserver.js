const http = require("http");

let todos = [];
let id = 1;

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/todos") {
    res.end(JSON.stringify(todos));
  } else if (req.method === "POST" && req.url === "/todos") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      const todo = JSON.parse(body);
      todo.id = id++;
      todos.push(todo);
      res.end(JSON.stringify(todo));
    });
  } else if (req.method === "DELETE" && req.url.startsWith("/todos/")) {
    const todoId = parseInt(req.url.split("/")[2]);
    todos = todos.filter((t) => t.id !== todoId);
    res.end(JSON.stringify({ message: "Deleted successfully" }));
  } else {
    res.writeHead(404);
    res.end("Route not found");
  }
});

server.listen(3000, () => {
  console.log("TODO API running on port 3000");
});
