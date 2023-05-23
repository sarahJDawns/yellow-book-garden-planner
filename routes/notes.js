const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const notesController = require("../controllers/notes");
const { ensureAuth } = require("../middleware/auth");

router.get("/", ensureAuth, notesController.getNotes);
router.post("/createNotes", upload.single("file"), notesController.createNotes);
router.delete("/deleteNotes/:id", notesController.deleteNotes);

module.exports = router;
