const mongoose = require("mongoose");

const cartSch = new mongoose.Schema({
  products: {
    type: [mongoose.Schema.ObjectId],
    ref: "Product",
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: false,
  },
});

module.exports = mongoose.model("Cart", cartSch);
