const express = require('express');
const session = require('express-session');

const app = express();
app.use(express.json());

app.use(session({
  secret: 'auth-secret',
  resave: false,
  saveUninitialized: false
}));

// Dummy users (for testing)
const users = [
  { id: 1, username: "user1", role: "user" },
  { id: 2, username: "mod1", role: "moderator" },
  { id: 3, username: "admin1", role: "admin" }
];

const posts = [];

// ---------- AUTH MIDDLEWARE ----------

// Check login
const isAuthenticated = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Login required" });
  }
  next();
};

// Role-based middleware
const requireRole = (role) => {
  return (req, res, next) => {
    const user = req.session.user;

    if (!user) {
      return res.status(401).json({ message: "Not authenticated" });
    }
