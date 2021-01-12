const mongoose = require("mongoose");

const BoardSchema = new mongoose.Schema({
  name: String,
  inviteLink: String,
  columns: { type: [String], default: [] },
  events: { type: [String], default: [] },
  tasks: { type: [String], default: [] },
  color: { type: String, default: "purple" }
});

// compile model from schema
module.exports = mongoose.model("board", BoardSchema);