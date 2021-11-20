const express = require("express");
const cakeController = require("../controllers/cakeController");
const router = express.Router();
const upload = require("../middleware/upload");

const {
  ensureAuthenticated,
  forwardAuthenticated,
} = require("../middleware/userAuth");

router.get("/", forwardAuthenticated, cakeController.view);
router.post("/", upload, ensureAuthenticated, cakeController.save);
router.get("/:id", forwardAuthenticated, cakeController.getSingle);
router.put("/:id", ensureAuthenticated, cakeController.update);
router.delete("/:id", ensureAuthenticated, cakeController.delete);

module.exports = router;
