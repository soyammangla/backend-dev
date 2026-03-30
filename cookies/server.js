import express from "express";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

const app = express();
const PORT = 3000;

app.use(cookieParser("my-super-secret-key"));

app.get("/set-cookie", (req, res) => {
  let user = {
    name: "John Doe",
    email: "john@gmail.com",
  };
  const token = jwt.sign(user, "my-super-secret-key", { expiresIn: "1h" });
  res.cookie("username", token, { httpOnly: true });
  res.send("Cookie has been set!");
});

const authMiddleware = (req, res, next) => {
  if (!req.cookies.username) {
    return res.send("No cookie found");
  }
  try {
    const decoded = jwt.verify(req.cookies.username, "my-super-secret-key");
    req.user = decoded;
    next();
  } catch (error) {
    res.send("Invalid cookie");
  }
};

app.get("/get-cookie", authMiddleware, (req, res) => {
  const username = req.cookies.username;
  res.send(`Cookie value: ${username}`);
});

app.get("/profile", authMiddleware, (req, res) => {
  const username = req.cookies.username;
  res.send(`Welcome to your profile, ${username}!`);
});

app.get("/logout", authMiddleware, (req, res) => {
  res.clearCookie("username");
  res.send("You have been logged out!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/set-cookie`);
});
