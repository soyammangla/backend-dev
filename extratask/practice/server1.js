const express = require("express");
const app = express();
const PORT = 3000;
const users = [
  { id: 1, name: "Aman", age: 21 },
  { id: 2, name: "Rohit", age: 22 },
  { id: 3, name: "Neha", age: 20 },
];
app.use((req, res, next) => {
  console.log(`Request URL: ${req.url}`);
  next();
});
app.get("/", (req, res) => {
  res.send("Welcome to the Home Page!");
});
app.get("/user/page", (req, res) => {
  res.send("This is the User Page!");
});
app.get("/user/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((u) => u.id === id);
  if (!user) {
    return res.status(404).send("User not found");
  }
  res.json(user);
});
app.get("/users", (req, res) => {
  res.json(users);
});
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
