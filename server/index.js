const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const app = express();
const PORT = 5000;

app.use(cors());

app.get("/api/github/:endpoint(*)", async (req, res) => {
  try {
    const endpoint = req.params.endpoint;
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

app.listen(PORT);
module.exports = app;
