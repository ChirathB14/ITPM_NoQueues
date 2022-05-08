//Checking whether, "Is the file is there or not (checking) when coming from API"

const multer = require("multer");
const path = require("path");

module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    //Here we can upload only images which have jpgs and png images only
    if (ext !== ".jpg" && ext !== ".png") { //extension checking
      cb(new Error("File type is not supported."), false);
      return;
    }
    cb(null, true);
  },
});
