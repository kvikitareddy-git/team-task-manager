const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());

// ================= ROUTES =================
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/task");
const authMiddleware = require("./middleware/auth");

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", authMiddleware, taskRoutes);

// Test route
app.get("/api/test", authMiddleware, (req, res) => {
  res.send("Protected route working ✅");
});

// ================= FRONTEND SERVE =================

// Serve React build
app.use(express.static(path.join(__dirname, "../my-app/build")));

// Catch-all route (IMPORTANT)
app.get((req, res) => {
  res.sendFile(path.join(__dirname, "../my-app/build", "index.html"));
});

// ================= DATABASE =================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected ✅"))
  .catch((err) => console.log(err));

// ================= SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});