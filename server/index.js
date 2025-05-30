const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const app = express();
const PORT = 5000;

app.use(cors());

// API маршруты — должны идти ПЕРВЫМИ
app.get("/api/github/:endpoint(*)", async (req, res) => {
  try {
    const endpoint = req.params.endpoint; // тут лучше req.params.endpoint, а не [0]
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

app.use(express.static(path.join(__dirname, "..", "gitApp", "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "gitApp", "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
