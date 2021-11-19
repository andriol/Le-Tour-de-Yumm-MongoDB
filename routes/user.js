const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

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

module.exports = router;
