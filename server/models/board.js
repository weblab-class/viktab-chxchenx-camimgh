const mongoose = require("mongoose");

const BoardSchema = new mongoose.Schema({
  name: String,
  inviteLink: String,
  users: { type: [String], default: [] },
  columns: { type: [String], default: [] },
  event: { type: String, default: undefined },
  tasks: { type: [String], default: [] },
  color: { type: String, default: "purple" }
});

// compile model from schema
module.exports = mongoose.model("board", BoardSchema);