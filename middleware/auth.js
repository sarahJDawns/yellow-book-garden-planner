module.exports = {
  ensureAuth: function (req, res, next) {
    if (req.isAuthenticated()) {
      res.locals.user = req.user;
      return next();
    } else {
      if (req.path === "/" || req.path === "/login" || req.path === "/signup") {
        return next();
      } else {
        return res.redirect("/");
      }
    }
  },
  ensureGuest: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    } else {
      res.redirect("/dashboard");
    }
  },
};
