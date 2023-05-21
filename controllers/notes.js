const cloudinary = require("../middleware/cloudinary");
const Note = require("../models/Note");
const mongoose = require("mongoose");

module.exports = {
  getDashboard: async (req, res) => {
    console.log(req.user);
    try {
      const notes = await Note.find({ user: req.user.id }).populate({
        path: "user",
        match: { username: req.user.username },
      });
      res.render("dashboard.ejs", { notes: notes, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getNote: async (req, res) => {
    try {
      const notes = await Note.findById(req.params.id).populate({
        path: "user",
      });
      console.log(notes);
      res.render("notes.ejs", {
        note: notes,
        user: req.user,
      });
    } catch (err) {
      console.log(err);
    }
  },
  createNote: async (req, res) => {
    try {
      let image = undefined;
      let cloudinaryId = undefined;
      const { title, caption, file } = req.body;
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        image = result.secure_url;
        cloudinaryId = result.public_id;
      }

      if (!title && !caption && !image) {
        req.flash("errors", { msg: "At least one field must be filled." });
        return res.redirect("/notes");
      }

      await Note.create({
        title: title,
        image: image,
        cloudinaryId: cloudinaryId,
        caption: caption,
        user: req.user.id,
      });
      console.log("Note has been added!");
      res.redirect("/notes");
    } catch (err) {
      console.log(err);
      req.flash("errors", { msg: "Failed to add note" });
      res.redirect("/notes");
    }
  },
  deleteNote: async (req, res) => {
    try {
      let note = await Note.findOneAndDelete({ _id: req.params.id });
      await cloudinary.uploader.destroy(note.cloudinaryId);
      await Note.remove({ _id: req.params.id });
      console.log("Deleted Note");
      res.redirect("/notes");
    } catch (err) {
      res.redirect("/notes");
    }
  },
};
