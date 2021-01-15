const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  googleid: String,
  boards: { type: [String], default: [] },
  tasks: { type: [String], default: [] },
  events: { type: [String], default: [] },
  addToCal: { type: Boolean, default: false },
  points: { type: Number, default: 0 },
  accessories: { type: [String], default: [] },
  alergies: { type: [String], default: [] }
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
