const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const notesController = require("../controllers/notes");
const { ensureAuth } = require("../middleware/auth");

router.get("/:id", ensureAuth, notesController.getNote);

router.post("/createNote", upload.single("file"), notesController.createNote);

router.delete("/deleteNote/:id", notesController.deleteNote);

module.exports = router;
