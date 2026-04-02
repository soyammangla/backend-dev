import express from "express";
const app = express();
const PORT = process.env.port || 3000;
app.get("/set-session", (req, res) => {
  req.session.user = {
    name: "John Doe",
    email: "john.doe@example.com",
  };
  res.send("Session set");
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
app.use((req, res, next) => {
  if (req.session.user) {
    console.log("User session:", req.session.user);
  } else {
    console.log("No user session found");
  }
  next();
});
app.get("/get-session", (req, res) => {
  if (req.session.user) {
    res.send(`User session: ${JSON.stringify(req.session.user)}`);
  } else {
    res.send("No user session found");
  }
});
app.get("/destroy-session", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.send("Error destroying session");
    }
    res.send("Session destroyed");
  });
});
