const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,

    minlength: 7,
    trim: true,
    validate(value) {
      const pass = "password";
      if (value.toLowerCase().includes(pass)) {
        throw new Error(`Password cannot contain ${pass}`);
      }
    },
  },
  city: {
    type: String,
  },
  province: {
    type: String,
  },
  zip: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  googleId: {
    type: String,
  },
});

userSchema.virtual("cakes", {
  ref: "User",
  localField: "_id",
  foreignField: "customer",
});

userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
