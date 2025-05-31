const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const app = express();
const PORT = 5000;

app.use(
  cors({
    origin: "https://git-app-kappa.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

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

app.use(express.static(path.join(__dirname, "..", "client", "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
