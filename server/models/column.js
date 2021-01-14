const mongoose = require("mongoose");

const ColumnSchema = new mongoose.Schema({
  name: String,
  tasks: { type: [String], default: [] },
  color: { type: String, default: "purple" }
});

// compile model from schema
module.exports = mongoose.model("column", ColumnSchema);