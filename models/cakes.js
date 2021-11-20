const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const cakeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    price: {
      type: String,
    },
    categories: {
      type: String,
    },

    image: {
      type: String,
    },

    customer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },

  {
    timestamps: true,
  }
);

const Cakes = mongoose.model("Cakes", cakeSchema);

module.exports = Cakes;
