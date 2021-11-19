const express = require("express");
const cakeController = require("../controllers/cakeController");
const router = express.Router();
const upload = require("../middleware/upload");
const auth = require("../middleware/auth");

router.get("/", cakeController.view);
router.post("/", upload, cakeController.save);
router.get("/:id", cakeController.getSingle);
router.put("/:id", cakeController.update);
router.delete("/:id", cakeController.delete);

module.exports = router;
