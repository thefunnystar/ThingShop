const mongoose = require("mongoose");

const userSc = new mongoose.Schema({
  email: String,
  password: String,
  fullName: String,
});

userSc.virtual("stores", {
  ref: "Store",
  localField: "_id",
  foreignField: "user",
  justOne: true,
});

module.exports = mongoose.model("User", userSc);
