const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const app = express();
const PORT = 5000;

const allowedOrigins = [
  "https://git-app-beob.vercel.app",
  "https://git-app-beob-git-main-evgenias-projects-2005d1f2.vercel.app",
  "https://git-app-beob-fivq5ie3f-evgenias-projects-2005d1f2.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
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
