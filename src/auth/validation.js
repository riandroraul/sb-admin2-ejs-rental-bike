const { check, body } = require("express-validator");
const path = require("path");

module.exports = {
  login: [
    check("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Enter a valid email"),
    check("password").notEmpty().withMessage("Password is required"),
  ],
  register: [
    check("name").notEmpty().withMessage("Full name is required").trim().escape(),
    check("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Enter a valid email")
      .normalizeEmail(),
    check("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    check("password2").notEmpty().withMessage("Password confirmation is required"),
    body("password2").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password and password confirmation must be match");
      }
      return true;
    }),
  ],
  updateProfile: [
    check("name")
      .notEmpty()
      .withMessage("Fullname is required")
      .isLength({ min: 3 })
      .withMessage("Fullname must be at least 3 characters long")
      .trim()
      .escape(),
    check("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Enter a valid email address"),
    check("phone")
      .notEmpty()
      .withMessage("Phone number is required")
      .isMobilePhone("id-ID")
      .withMessage("Enter a valid phone number"),
    check("address")
      .notEmpty()
      .withMessage("Address is required")
      .isLength({ min: 10 })
      .withMessage("Address must be at least 10 characters long"),
    check("profile_picture").custom((value, { req }) => {
      if (!req.file) {
        throw new Error("Image is required");
      }

      // Custom file type and size validation
      const file = req.file;
      const filetypes = /jpeg|jpg|png|gif/;
      const extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
      );
      const mimetype = filetypes.test(file.mimetype);
      const maxSize = 1000000; // 1MB

      if (!mimetype || !extname) {
        throw new Error("Image extension must be jpg, jpeg, png, gif");
      } else if (file.size > maxSize) {
        throw new Error("File size exceeds the limit of 1MB!");
      }
    }),
  ],
};
