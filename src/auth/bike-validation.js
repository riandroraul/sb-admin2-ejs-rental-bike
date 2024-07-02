const { check } = require("express-validator");

module.exports = {
  addBike: [
    check("bikeName").notEmpty().withMessage("bike name is required").trim().escape(),
    check("price").notEmpty().withMessage("price is required").trim().escape(),
    check("year").notEmpty().withMessage("year is required").trim().escape(),
    check("battery").notEmpty().withMessage("battery is required").trim().escape(),
    check("weight").notEmpty().withMessage("weight is required").trim().escape(),
    check("max_speed").notEmpty().withMessage("max speed is required").trim().escape(),
    check("shifter").notEmpty().withMessage("shifter is required").trim().escape(),
    check("motor").notEmpty().withMessage("motor is required").trim().escape(),
    check("url_image").notEmpty().withMessage("url image is required").trim().escape(),
    check("desc").notEmpty().withMessage("description is required").trim().escape(),
  ],
};
