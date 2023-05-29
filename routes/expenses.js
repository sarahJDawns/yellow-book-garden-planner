const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/auth");
const expensesController = require("../controllers/expenses");

router.get("/", ensureAuth, expensesController.getExpenses);
router.post("/addExpenses", expensesController.addExpenses);
router.delete("/deleteExpenses/:id", expensesController.deleteExpenses);
module.exports = router;
