const cloudinary = require("../middleware/cloudinary");
const Notes = require("../models/Notes");
const mongoose = require("mongoose");

module.exports = {
  getProfile: async (req, res) => {
    console.log(req.user);
    try {
      const notes = await Notes.find({ user: req.user.id }).populate({
        path: "user",
        match: { username: req.user.username },
      });
      res.render("dashboard.ejs", { notes: notes, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },

  getNotes: async (req, res) => {
    try {
      const notes = await Notes.find({ user: req.user._id }).populate({
        path: "user",
        match: { username: req.user.username },
      });
      res.render("notes.ejs", { notes: notes, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },

  createNotes: async (req, res) => {
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

      await Notes.create({
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
      req.flash("errors", { msg: "Failed to add note!" });
      res.redirect("/notes");
    }
  },

  deleteNotes: async (req, res) => {
    try {
      const note = await Notes.findById(req.params.id);

      await cloudinary.uploader.destroy(note.cloudinaryId);
      await Notes.deleteOne({ _id: req.params.id });
      console.log("Deleted Note");
      res.redirect("/notes");
    } catch (err) {
      console.log(err);
      res.redirect("/notes");
    }
  },
};