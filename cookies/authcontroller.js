import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const router = express.Router();

// Secret key for JWT signing and encryption
const JWT_SECRET = "your_jwt_secret_key";

// Mock user data for demonstration purposes
const users = [
  {
    id: 1,
    username: "user1",
    password: bcrypt.hashSync("password1", 10), // Hashed password
  },
  {
    id: 2,
    username: "user2",
    password: bcrypt.hashSync("password2", 10), // Hashed password
  },
];
// Login route
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Find user by username
  const user = users.find((u) => u.username === username);
  if (!user) {
    return res.status(401).json({ message: "Invalid username or password" });
  }
  // Compare provided password with stored hashed password

  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid username or password" });
  }
  // Generate JWT token
  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
    expiresIn: "1h", //
  });
  // Set token in HTTP-only cookie
  res.cookie("token", token, { httpOnly: true });
  res.json({ message: "Login successful" });
});
// Logout route
router.post("/logout", (req, res) => {
  // Clear the token cookie
  res.clearCookie("token");
  res.json({ message: "Logout successful" });
});
export default router;
