const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/auth");

router.get("/dashboard", ensureAuth, (req, res) => {
  res.render("dashboard.ejs", { title: res.locals.title });
});
router.get("/calculator", ensureAuth, (req, res) => {
  res.render("calculator.ejs", { title: res.locals.title });
});
router.get("/expenses", ensureAuth, (req, res) => {
  res.render("expenses.ejs", { title: res.locals.title });
});
router.get("/notes", ensureAuth, (req, res) => {
  res.render("notes.ejs", { title: res.locals.title });
});

module.exports = router;
