const controller = [];
const User = require("../models/user");
const passport = require("passport");

// login page
controller.page = (req, res) => {
  res.render("log-in");
};

//login
controller.login = (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
    failureFlash: true,
  })(req, res, next);
};
// user page
controller.me = (req, res) => {
  res.render("user", {
    user: req.user,
  });
};

// register page
controller.view = (req, res) => {
  res.render("sign-up");
};

//register
controller.save = async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    req.flash("success_msg", "You are now registered and can log in");
    res.redirect("/login");
  } catch (err) {
    res.status(400).send(err);
  }
};

// logout
controller.logout = (req, res) => {
  req.logout();

  req.flash("logout_msg", "You are logged out");
  res.redirect("/login");
};

module.exports = controller;
