const express = require("express");
const app = express();

app.use(express.json());

app.get("/users/:id/profile", (req, res) => {
  const userId = req.params.id;

  const selectedTab = req.query.tab || "info"; // default = info
  const language = req.query.lang || "en"; // default = en

  res.status(200).json({
    userId: userId,
    selectedTab: selectedTab,
    language: language,
  });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
