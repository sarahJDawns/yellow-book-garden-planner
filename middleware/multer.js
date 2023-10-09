const multer = require("multer");
const path = require("path");

module.exports = multer({
  storage: multer.diskStorage({}),
fileFilter: (req, file, cb) => {
  const allowedExtensions = [".jpg", ".jpeg", ".png"];
  const fileExtension = path.extname(file.originalname);

  if (!allowedExtensions.includes(fileExtension)) {
    cb(new Error("File type is not supported"), false);
    return;
  }

  cb(null, true);
},
});
