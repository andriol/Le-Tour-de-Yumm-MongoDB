const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();
const passport = require("passport");
const Cake = require("../models/cakes");
const upload = require("../middleware/upload");
const {
  ensureAuthenticated,
  forwardAuthenticated,
} = require("../middleware/userAuth");

router.get("/register", forwardAuthenticated, userController.view);
router.post("/register", userController.save);
router.get("/login", forwardAuthenticated, userController.page);
router.post("/login", userController.login);
router.get("/profile", ensureAuthenticated, userController.me);
router.get("/logout", userController.logout);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/profile",
  upload,
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect to secrets.
    res.redirect("/profile");
  }
);

module.exports = router;
