const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/auth");
const gardenController = require("../controllers/garden");

router.get("/", ensureAuth, (req, res, next) => {
  if (req.accepts("html")) {
    gardenController.getGardenHtml(req, res, next);
  } else if (req.accepts("json")) {
    gardenController.getGardenJson(req, res, next);
  } else {
    gardenController.getGardenHtml(req, res, next);
  }
});
router.post("/saveGarden", gardenController.saveGarden);
router.post("/clearGarden", gardenController.clearGarden);

module.exports = router;
