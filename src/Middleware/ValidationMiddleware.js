const { validationResult } = require("express-validator");
const Bicycle = require("../db/models/bicycle");

const ValidationMiddleware = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const path = req.path.replace("/", "");
    let title = "";
    switch (path) {
      case "login":
        title = "Rental Bike | Login";
        return res.status(422).render("login", {
          layout: "public-pages/main",
          title,
          formData: req.body,
          errors: errors.array(),
        });
      case "register":
        title = "Rental Bike | Registration";
        return res.status(422).render("signup", {
          layout: "public-pages/main",
          title,
          formData: req.body,
          errors: errors.array(),
        });
      case "forgot-password":
        title = "Rental Bike | Forgot Password";
        return res.status(422).render("forgot-password", {
          layout: "public-pages/main",
          title,
          formData: req.body,
          errors: errors.array(),
        });
      case "add-new-bike":
        title = "Rental Bike | Add New Bike";
        console.log(req.body);
        return res.status(422).render("admin/add-bike", {
          layout: "layouts/main",
          title,
          formData: req.body,
          path: "/bikes",
          user: req.user,
          errors: errors.array(),
        });
      case "book-now":
        title = "Rental Bike | Add New Bike";
        console.log(req.body);
        const bike = await Bicycle.findOne({
          where: { bike_id: parseInt(req.body.bike_id) },
          raw: true,
        });
        return res.status(422).render("check-booking", {
          layout: "layouts/main",
          title,
          bike,
          formData: req.body,
          path: "/bikes",
          user: req.user,
          errors: errors.array(),
        });
    }
  }
  next();
};

module.exports = ValidationMiddleware;
