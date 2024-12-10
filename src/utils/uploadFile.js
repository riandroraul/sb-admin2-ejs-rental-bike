const multer = require("multer");
const path = require("path");

// Set storage engine
const storage = multer.diskStorage({
  destination: "./public/assets/img/profile_picture",
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});
// const file = req.file;
// const filetypes = /jpeg|jpg|png|gif/;
// const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
// const mimetype = filetypes.test(file.mimetype);
// const maxSize = 1000000; // 1MB

// if (!mimetype || !extname) {
//   throw new Error("Image extension must be jpg, jpeg, png, gif");
// } else if (file.size > maxSize) {
//   throw new Error("File size exceeds the limit of 1MB!");
// }

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1 * 1024 * 1024, // 2MB
  },
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb("Error: Images only! (jpeg, jpg, png, gif)");
    }
  },
}).single("profile_picture");
module.exports = upload;
