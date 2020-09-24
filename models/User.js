const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    lastname: String,
    email: { type: String, unique: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    password: String
  });
  
  const User = mongoose.model("User", userSchema);
  
  module.exports = User;
  
