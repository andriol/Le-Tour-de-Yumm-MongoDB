const jwt = require("jsonwebtoken");
const Cake = require("../models/cakes");
require("dotenv").config();
const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, proces.env.SECRET_PASS);
    const cake = await Cake.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!cake) {
      throw new Error();
    }

    req.token = token;
    req.cake = cake;
    next();
  } catch (e) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

module.exports = auth;
