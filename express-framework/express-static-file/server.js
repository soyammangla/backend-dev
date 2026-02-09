import express from "express";

const port = 3000;
const app = express();
app.use("/static", express.static("public"));

app.get("/", (req, res) => {
  res.send("home");
});

app.listen(port, () => {
  console.log("The server is running " + port);
});
