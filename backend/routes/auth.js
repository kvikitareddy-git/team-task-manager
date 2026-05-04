const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

// Dummy user (for testing)
let users = [];

// SIGNUP
router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  const user = { id: Date.now(), name, email, password };
  users.push(user);

  res.json({ message: "User created" });
});

// LOGIN
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) return res.status(400).send("Invalid credentials");

  const token = jwt.sign({ id: user.id }, "secret");
  res.json({ token });
});

module.exports = router;