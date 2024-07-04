const { check } = require("express-validator");

module.exports = {
  addBike: [
    check("bike_name")
      .notEmpty()
      .withMessage("field bike name is required")
      .trim()
      .escape(),
    check("price").notEmpty().withMessage("field price is required").trim().escape(),
    check("year").notEmpty().withMessage("field year is required").trim().escape(),
    check("battery").notEmpty().withMessage("field battery is required").trim().escape(),
    check("weight").notEmpty().withMessage("field weight is required").trim().escape(),
    check("max_speed").notEmpty().withMessage("field max speed is required").trim(),
    check("shifter").notEmpty().withMessage("field shifter is required").trim().escape(),
    check("motor").notEmpty().withMessage("field motor is required").trim().escape(),
    check("url_image").notEmpty().withMessage("field url image is required").trim(),
    check("desc").notEmpty().withMessage("field description is required").trim().escape(),
  ],
};
