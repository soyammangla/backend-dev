Problem 6: Rate-Limited Login with Account Lockout
Objective: Implement login rate limiting and account lockout after failed attempts.
Requirements:
● Allow 5 login attempts per hour per email
● Lock account for 30 minutes after 5 failed attempts
● Track failed attempts
● Clear attempts counter on successful login
● Return appropriate error messages
Starter Code:
const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
app.use(express.json());
const users = [];
const loginAttempts = new Map(); // email -> { count, lockUntil }
// TODO: Implement check login attempts
function checkLoginAttempts(email) {
// Your code here
}
// TODO: Implement record failed attempt
function recordFailedAttempt(email) {
// Your code here
}

// TODO: Implement clear attempts
function clearAttempts(email) {
// Your code here
}
// TODO: Implement login with rate limiting
app.post('/login', async (req, res) => {
// Your code here
});
app.listen(3000);
