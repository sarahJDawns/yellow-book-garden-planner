const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("dashboard");
});
router.get("/calculator", (req, res) => {
  res.render("calculator");
});
router.get("/expenses", (req, res) => {
  res.render("expenses");
});
router.get("/kanban", (req, res) => {
  res.render("kanban");
});
router.get("/notes", (req, res) => {
  res.render("notes");
});
router.get("/planner", (req, res) => {
  res.render("planner");
});

module.exports = router;
