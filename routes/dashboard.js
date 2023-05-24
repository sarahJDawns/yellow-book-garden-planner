const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("dashboard.ejs");
});
router.get("/calculator", (req, res) => {
  res.render("calculator.ejs");
});
router.get("/expenses", (req, res) => {
  res.render("expenses.ejs");
});
// router.get("/kanban", (req, res) => {
//   res.render("kanban.ejs");
// });
router.get("/notes", (req, res) => {
  res.render("notes.ejs");
});
router.get("/garden", (req, res) => {
  res.render("garden.ejs");
});

module.exports = router;
