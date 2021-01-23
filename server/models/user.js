const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  googleid: String,
  bio: { type: String, default: "" },
  planet: { type: String, default: "Mercury" },
  planets: { type: [String], default: ["Mercury"] },
  boards: { type: [String], default: [] },
  tasks: { type: [String], default: [] },
  events: { type: [String], default: [] },
  addToCal: { type: Boolean, default: false },
  points: { type: Number, default: 0 },
  accessories: { type: [String], default: [] },
  allergies: { type: [String], default: [] }
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
