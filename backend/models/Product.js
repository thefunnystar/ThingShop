const mongoose = require("mongoose");

const prodSchema = new mongoose.Schema({
  title: String,
  price: Number,
  ext: String,
  img: String,
  store: {
    type: mongoose.Schema.ObjectId,
    ref: "Store",
    required: false,
  },
});

module.exports = mongoose.model("Product", prodSchema);
