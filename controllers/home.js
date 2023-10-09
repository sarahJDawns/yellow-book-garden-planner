module.exports = {
getIndex: (req, res) => {
  res.render("index.ejs");
},

getProfile: async (req, res) => {
  try {
    const user = req.user;

    res.render("dashboard.ejs", { user });
  } catch (err) {
    console.error(err);
  }
},
};
