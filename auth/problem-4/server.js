const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const ACCESS_SECRET = 'access-secret';
const REFRESH_SECRET = 'refresh-secret';

// Dummy users
const users = [
  { id: 1, username: "john", password: "1234" }
];

// Store refresh tokens
const refreshTokens = new Set();

// Generate access token (15 min)
function generateAccessToken(user) {
  return jwt.sign(
    { id: user.id, username: user.username },
    ACCESS_SECRET,
    { expiresIn: '15m' }
  );
}

// Generate refresh token (7 days)
function generateRefreshToken(user) {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    REFRESH_SECRET,
    { expiresIn: '7d' }
  );

  refreshTokens.add(token); // store token
  return token;
}

// LOGIN
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  res.json({
    accessToken,
    refreshToken
  });
});

// REFRESH TOKEN
app.post('/token/refresh', (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({ message: "Refresh token required" });
  }

  if (!refreshTokens.has(token)) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }

  jwt.verify(token, REFRESH_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token expired or invalid" });
    }

    const accessToken = generateAccessToken(user);

    res.json({ accessToken });
  });
});

// LOGOUT
app.post('/logout', (req, res) => {
  const { token } = req.body;

  if (token && refreshTokens.has(token)) {
    refreshTokens.delete(token);
  }

  res.json({ message: "Logged out successfully" });
});

// PROTECTED ROUTE
app.get('/protected', (req, res) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ message: "Access token required" });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, ACCESS_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    res.json({
      message: "Protected data accessed",
      user
    });
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
