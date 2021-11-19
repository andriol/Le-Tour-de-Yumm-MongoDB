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
    tokens: [
      {
        token: {
          type: String,
          //required: true,
        },
      },
    ],
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

cakeSchema.methods.generateAuthToken = async function () {
  const cake = this;

  const token = jwt.sign({ _id: cake._id.toString() }, process.env.SECRET_PASS);

  cake.tokens = cake.tokens.concat({ token });
  await cake.save();

  return token;
};
const Cakes = mongoose.model("Cakes", cakeSchema);

module.exports = Cakes;
