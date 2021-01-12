const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  name: String,
  description: { type: String, default: "" },
  attendees: { type: [String], default: [] },
  startTime: { type: Date, default: undefined },
  endTime: { type: Date, default: undefined },
  points: { type: Number, default: 1 },
  color: { type: String, default: "purple" },
  location: { type: String, default: "" }
});

// compile model from schema
module.exports = mongoose.model("event", EventSchema);