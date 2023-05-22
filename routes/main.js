const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const notesController = require("../controllers/notes");
const { ensureAuth } = require("../middleware/auth");

router.get("/", homeController.getIndex);
router.get("/dashboard", ensureAuth, notesController.getProfile);

router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);
router.get("/delete-account", ensureAuth, authController.getDeleteAccount);
router.post("/delete-account", ensureAuth, authController.postDeleteAccount);

module.exports = router;
