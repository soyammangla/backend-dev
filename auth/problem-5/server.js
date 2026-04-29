const express = require('express');
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

// Session setup
app.use(session({
  secret: 'passport-secret',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

const SECRET = "jwt-secret";

// Dummy users
const users = [
  { id: 1, username: "john", password: "1234" }
];

// ---------- SERIALIZATION ----------
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = users.find(u => u.id === id);
  done(null, user);
});

// ---------- LOCAL STRATEGY ----------
passport.use('local', new LocalStrategy(
  (username, password, done) => {
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
      return done(null, false, { message: "Invalid credentials" });
    }

    return done(null, user);
  }
));

// ---------- JWT STRATEGY ----------
passport.use('jwt', new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET
  },
  (payload, done) => {
    const user = users.find(u => u.id === payload.id);

    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  }
));

// ---------- LOGIN (SESSION BASED) ----------
app.post('/auth/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return res.status(500).json({ message: "Server error" });

    if (!user) {
      return res.status(401).json({ message: info.message });
    }

    req.login(user, (err) => {
      if (err) return res.status(500).json({ message: "Login failed" });

      return res.json({ message: "Logged in with session" });
    });
  })(req, res, next);
});

// ---------- API LOGIN (JWT) ----------
app.post('/auth/api-login', (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) return res.status(500).json({ message: "Server error" });

    if (!user) {
      return res.status(401).json({ message: info.message });
    }

    const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: '1h' });

    res.json({ token });
  })(req, res, next);
});

// ---------- SESSION PROTECTED ----------
app.get('/dashboard',
  (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Login required" });
    }
    next();
  },
  (req, res) => {
    res.json({
      message: "Welcome to dashboard",
      user: req.user
    });
  }
);

// ---------- JWT PROTECTED ----------
app.get('/api/profile',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      message: "JWT profile data",
      user: req.user
    });
  }
);

// ---------- SWITCH AUTH METHOD INFO ----------
app.get('/auth/methods', (req, res) => {
  res.json({
    methods: ["session-based (/auth/login)", "jwt-based (/auth/api-login)"]
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
