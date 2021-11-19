const controller = [];
const multer = require("multer");
const Cake = require("../models/cakes");

controller.save = async (req, res) => {
  const cake = new Cake({
    ...req.body,
    customer: req.user._id,
  });

  try {
    await cake.save();

    const token = await cake.generateAuthToken();
    console.log(token);
    res.status(201).send({ cake, token });
  } catch (err) {
    res.status(400).send(err);
  }
};

controller.view = async (req, res) => {
  try {
    const cakes = await Cake.find({});
    res.render("products", { cakes });
  } catch (err) {
    res.status(500).send(err);
  }
};
controller.getSingle = async (req, res) => {
  const _id = req.params.id;

  try {
    const cake = await Cake.findById({ _id });
    res.send(cake);
  } catch (err) {
    res.status(500).send(err);
  }
};

const Storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./public/images");
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  },
});

const upload = multer({
  storage: Storage,
}).single("image");

controller.image = async (req, res) => {
  upload(req, res, function (err) {
    req.cake.image = req.file.filename;

    req.cake.save();
    res.send();
  });
};

controller.update = async (req, res) => {
  const _id = req.params.id;

  try {
    const cake = await Cake.findByIdAndUpdate({ _id }, req.body, {
      new: true,
    });
    res.send(cake);
  } catch (err) {
    res.status(400).send(err);
  }
};
controller.delete = async (req, res) => {
  const _id = req.params.id;
  try {
    const cake = await Cake.findByIdAndDelete({ _id });
    res.send(cake);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = controller;
