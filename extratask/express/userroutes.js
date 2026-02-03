import express from "express";
const app = express();
app.use(express.json());
let user = [
  {
    id: 1,
    username: "Aryan",
    password: "1234",
  },
  {
    id: 2,
    username: "John",
    password: "abcd",
  },
  {
    id: 3,
    username: "Doe",
    password: "xyz",
  },
];

app.get("/", (req, res) => {
  res.send(200).json({
    message: "home route",
  });
});

app.get("/user", (req, res) => {
  res.status(200).json({
    message: "user data",
    user,
  });
});
app.post("/user", (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  if (!username || !password) {
    returners.status(400).status("Username and password are required");
  }
  if (password.length < 6) {
    return res.send("Password must be at least 6 characters long");
  }
  let newuser = {
    id: user.length + 1,
    username,
    password,
  };
  user.push(newuser);
  res.status(200).json({
    message: "post user data",
  });
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
