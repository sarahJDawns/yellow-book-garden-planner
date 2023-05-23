const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/auth");
const kanbanController = require("../controllers/kanban");

router.get("/", ensureAuth, kanbanController.getKanban);
router.post("/createKanban", kanbanController.createKanban);
router.delete("/deleteKanban/:id", kanbanController.deleteKanban);

module.exports = router;
