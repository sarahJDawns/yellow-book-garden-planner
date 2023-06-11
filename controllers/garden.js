const Garden = require("../models/Garden");

module.exports = {
  getGardenHtml: async (req, res) => {
    try {
      const garden = await Garden.find({ user: req.user.id });

      res.render("garden.ejs", {
        garden: garden,
      });

      console.log("Garden fetched html:", garden);
    } catch (err) {
      console.log("Failed to retrieve garden!");
      res.render("garden.ejs");
    }
  },

  getGardenJson: async (req, res) => {
    try {
      const garden = await Garden.find({ user: req.user.id });

      res.json({
        garden: garden,
      });

      console.log("Garden fetched json:", garden);
    } catch (err) {
      console.log("Failed to retrieve garden!");
    }
  },

  saveGarden: async (req, res) => {
    try {
      const garden = await Garden.findOne({ user: req.user });

      if (!garden) {
        const newGarden = new Garden({
          cells: req.body.cells,
          user: req.user,
          createdAt: new Date(),
        });
        await newGarden.save();
        console.log("New garden saved:", newGarden);
      } else {
        garden.cells = req.body.cells;
        await garden.save();

        req.flash("info", { msg: "Garden saved successfully!" });
        console.log("Existing garden updated:", garden);
      }
      res.redirect("/garden");
    } catch (err) {
      console.log("Garden not saved!");
    }
  },

  clearGarden: async (req, res) => {
    try {
      await Garden.findOneAndUpdate(
        { user: req.user },
        { $unset: { cells: 1 } }
      );

      req.flash("info", { msg: "Garden has been cleared!" });
      console.log("Garden cleared successfully!");
      res.redirect("/garden");
    } catch (err) {
      console.log("Garden not cleared!");
    }
  },
};
