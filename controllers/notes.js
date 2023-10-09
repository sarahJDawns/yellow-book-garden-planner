const cloudinary = require("../middleware/cloudinary");
const Notes = require("../models/Notes");
const mongoose = require("mongoose");

module.exports = {
  getNotes: async (req, res) => {
    try {
      const notes = await Notes.find({ user: req.user });
      res.render("notes.ejs", { notes: notes, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },

createNotes: async (req, res) => {
  try {
    let image;
    let cloudinaryId;
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
      title,
      image,
      cloudinaryId,
      caption,
      user: req.user.id,
    });

    res.redirect("/notes");
  } catch (err) {
    console.log(err);
    req.flash("errors", { msg: "Failed to add note!" });
    res.redirect("/notes");
  }
},

deleteNotes: async (req, res) => {
  try {
    const note = await Notes.findOne({ _id: req.params.id });
    if (note.image && note.cloudinaryId) {
      await cloudinary.uploader.destroy(note.cloudinaryId);
    }
    await Notes.deleteOne({ _id: req.params.id });
    res.redirect("/notes");
  } catch (err) {
    console.log(err);
    res.redirect("/notes");
  }
},
};
