const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const app = express();
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use(cors());

app.use(express.static(path.join(__dirname, "..", "gitApp", "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "gitApp", "build", "index.html"));
});

app.get("/api/github/:endpoint(*)", async (req, res) => {
  const endpoint = req.params[0];
  const query = new URLSearchParams(req.query).toString();

  const url = `https://api.github.com/${endpoint}${query ? `?${query}` : ""}`;
  const gitHubReq = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.TOKEN}`,
      "User-Agent": "GitHub-Proxy",
    },
  });

  const data = await gitHubReq.json();
  res.json(data);
});
