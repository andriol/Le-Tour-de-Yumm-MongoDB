const controller = [];
const Cake = require("../models/cakes");

controller.save = async (req, res) => {
  try {
    const cake = new Cake({
      image: req.file.filename,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      categories: req.body.categories,
      customer: req.user._id,
    });

    await cake.save();

    res.status(201).send(cake);
  } catch (err) {
    res.status(500).send(err);
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
