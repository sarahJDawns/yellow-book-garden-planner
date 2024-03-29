const passport = require("passport");
const validator = require("validator");
const User = require("../models/User");
const Notes = require("../models/Notes");
const Kanban = require("../models/Kanban");
const Garden = require("../models/Garden");
const Expenses = require("../models/Expenses");

exports.getLogin = (req, res) => {
  req.user ? res.redirect("/dashboard") : res.render("login", { title: "Login" });
};

exports.postLogin = (req, res, next) => {
  const errors = [];

  if (!validator.isEmail(req.body.email)) {
    errors.push({ msg: "Please enter a valid email address." });
  }

  if (validator.isEmpty(req.body.password)) {
    errors.push({ msg: "Password cannot be blank." });
  }

  if (errors.length) {
    req.flash("errors", errors);
    return res.redirect("/login");
  }

  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash("errors", info);
      return res.redirect("/login");
    }

    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("info", { msg: "Success! You are logged in." });
      res.redirect(req.session.returnTo || "/dashboard");
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Failed to destroy the session during logout.", err);
    } else {
      console.log("User has logged out.");
    }
    req.user = null;
    res.redirect("/");
  });
};

exports.getSignup = (req, res) => {
  if (!req.user) {
    res.render("signup");
  } else {
    res.redirect("/dashboard");
  }
};

exports.postSignup = async (req, res, next) => {
  try {
    const validationErrors = [];
    if (!validator.isEmail(req.body.email)) {
      validationErrors.push({ msg: "Please enter a valid email address." });
    }
    if (!validator.isLength(req.body.password, { min: 8 })) {
      validationErrors.push({ msg: "Password must be at least 8 characters long." });
    }
    if (req.body.password !== req.body.confirmPassword) {
      validationErrors.push({ msg: "Passwords do not match." });
    }

    if (validationErrors.length > 0) {
      req.flash("errors", validationErrors);
      return res.redirect("../signup");
    }

    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false });

    const existingUser = await User.findOne({
      $or: [{ email: req.body.email }, { userName: req.body.userName }],
    });

    if (existingUser) {
      req.flash("errors", { msg: "Account with that email address or username already exists." });
      return res.redirect("../signup");
    }

    const user = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
    });

    await user.save();

    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/dashboard");
    });
  } catch (err) {
    return next(err);
  }
};

exports.getDeleteAccount = (req, res) => {
  res.render("delete-account");
};

exports.postDeleteAccount = async (req, res) => {
  const validationErrors = [];

  if (req.body.password !== req.body.confirmPassword) {
    validationErrors.push({ msg: "Passwords do not match." });
  }

  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("../delete-account");
  }

  if (!req.body.password || !req.body.confirmPassword) {
    req.flash("errors", { msg: "All fields are required." });
    return res.redirect("/delete-account");
  }

  try {
    await Notes.deleteMany({ user: req.user.id });
    await Kanban.deleteMany({ user: req.user.id });
    await Garden.deleteOne({ user: req.user.id });
    await Expenses.deleteMany({ user: req.user.id });
    await User.deleteOne({ _id: req.user._id });

    req.flash("info", { msg: "Your account has been deleted." });
    return res.redirect("/");
  } catch (err) {
    console.error("Error in deletion", err);
    return res.redirect("/signup");
  }
};
