const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  user: String,
});

module.exports = mongoose.model("Task", taskSchema);