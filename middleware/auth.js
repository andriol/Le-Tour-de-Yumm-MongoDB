const jwt = require("jsonwebtoken");
const Cake = require("../models/cakes");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.SECRET_PASS);
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
