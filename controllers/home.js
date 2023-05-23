module.exports = {
  getIndex: (req, res) => {
    res.render("index.ejs");
  },

  getProfile: async (req, res) => {
    console.log(req.user);
    try {
      const user = req.user;

      res.render("dashboard.ejs", { user: user });
    } catch (err) {
      console.log(err);
    }
  },
};
