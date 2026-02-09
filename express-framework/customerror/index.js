import express from "express";
const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.send("Home Page");
});

// 404 handler (MUST be last)
app.use((req, res) => {
  res.status(404).render("404");
});

app.listen(3000);
