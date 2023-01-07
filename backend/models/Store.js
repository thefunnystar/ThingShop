const mongoose = require("mongoose");

const storeSch = new mongoose.Schema(
  {
    name: String,
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

storeSch.virtual("products", {
  ref: "Product",
  localField: "_id",
  foreignField: "store",
  justOne: false,
});

module.exports = mongoose.model("Store", storeSch);
