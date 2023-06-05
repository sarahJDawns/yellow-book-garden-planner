const Expenses = require("../models/Expenses");

module.exports = {
  getExpenses: async (req, res) => {
    console.log(req.user);
    try {
      const expenses = await Expenses.find({ user: req.user });
      res.render("expenses.ejs", {
        expenses: expenses,
        count: expenses.length,
        data: expenses,
        user: req.user,
      });
    } catch (err) {
      console.log(err);
    }
  },

  addExpenses: async (req, res) => {
    console.log(req.user);
    try {
      await Expenses.create({
        text: req.body.text,
        amount: parseFloat(req.body.amount),
        user: req.user,
      });
      console.log("Expenses has been added!");
      res.redirect("/expenses");
    } catch (err) {
      console.log(err);
      res.redirect("/expenses");
    }
  },

  deleteExpenses: async (req, res) => {
    console.log(req.user);
    try {
      await Expenses.deleteOne({
        _id: req.params.id,
      });
      console.log("Deleted Expenses");
      res.redirect("/expenses");
    } catch (err) {
      console.log(err);
      res.redirect("/expenses");
    }
  },
};
