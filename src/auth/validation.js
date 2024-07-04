const { check, body } = require("express-validator");

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
        throw new Error("Password confirmation does not match password");
      }
      return true;
    }),
  ],
};
