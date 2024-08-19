const express = require("express");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const artistRoutes = require("./routes/artistRoutes");
const musicRoutes = require("./routes/musicRoutes");

const app = express();

// Enable CORS for all origins
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// app routes

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/artist", artistRoutes);
app.use("/api/music", musicRoutes);

// Basic route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Express server!" });
});

module.exports = app;
