const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: String,
  description: { type: String, default: "" },
  assignees: { type: [String], default: [] },
  finishBy: { type: Date, default: undefined },
  points: { type: Number, default: 1 },
  color: { type: String, default: "purple" }
});

// compile model from schema
module.exports = mongoose.model("task", TaskSchema);