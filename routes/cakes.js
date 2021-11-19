const express = require("express");
const cakeController = require("../controllers/cakeController");
const router = express.Router();
const auth = require("../middleware/auth");

router.get("/", cakeController.view);
router.post("/", cakeController.save);
router.get("/:id", auth, cakeController.getSingle);
router.put("/:id", auth, cakeController.update);
router.delete("/:id", auth, cakeController.delete);
router.post("/:id/image", auth, cakeController.image);

module.exports = router;
