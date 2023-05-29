const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const { ensureAuth } = require("../middleware/auth");

router.get("/", homeController.getIndex);
router.get("/dashboard", homeController.getProfile);

router.get("/calculator", ensureAuth, (req, res) => {
  res.render("calculator.ejs");
});

router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);
router.get("/delete-account", ensureAuth, authController.getDeleteAccount);
router.post("/delete-account", ensureAuth, authController.postDeleteAccount);

module.exports = router;
