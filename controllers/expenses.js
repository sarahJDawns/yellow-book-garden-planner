const Expenses = require("../models/Expenses");

module.exports = {
getExpenses: async (req, res) => {
  try {
    const userExpenses = await Expenses.find({ user: req.user.id });
    res.render("expenses.ejs", {
      expenses: userExpenses,
      count: userExpenses.length,
      data: userExpenses,
      user: req.user,
    });
  } catch (err) {
    console.log(err);
  }
},

addExpenses: async (req, res) => {
  try {
    const { text, amount } = req.body;
    const { _id } = req.user;

    await Expenses.create({
      text,
      amount: parseFloat(amount),
      user: _id,
    });

    res.redirect("/expenses");
  } catch (err) {
    console.log(err);
    res.redirect("/expenses");
  }
},

deleteExpenses: async (req, res) => {
  try {
    await Expenses.deleteOne({ _id: req.params.id });
    res.redirect("/expenses");
  } catch (err) {
    console.log(err);
    res.redirect("/expenses");
  }
},
};
