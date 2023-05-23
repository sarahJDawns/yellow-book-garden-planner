const Kanban = require("../models/Kanban");

module.exports = {
  getKanban: async (req, res) => {
    console.log(req.user);
    try {
      const kanban = await Kanban.find({ user: req.user });

      res.render("kanban.ejs", {
        kanban: kanban,
        user: req.user,
      });
    } catch (err) {
      console.log(err);
    }
  },
  createKanban: async (req, res) => {
    try {
      await Kanban.create({
        item: req.body.item,
        category: req.body.category,
        user: req.user.id,
        createdAt: new Date(),
      });
      console.log("Item has been added!");
      res.redirect("/kanban");
    } catch (err) {
      console.log(err);
      req.flash("errors", { msg: "Failed to add item!" });
      res.redirect("/kanban");
    }
  },

  deleteKanban: async (req, res) => {
    try {
      await Kanban.deleteOne({ _id: req.params.id });
      console.log("Deleted Item");
      res.redirect("/kanban");
    } catch (err) {
      console.log(err);
      res.redirect("/kanban");
    }
  },
};
