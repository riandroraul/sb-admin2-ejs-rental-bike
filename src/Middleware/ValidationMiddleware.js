const { validationResult } = require("express-validator");
const Bicycle = require("../db/models/bicycle");
const Payment = require("../db/models/payment");

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
      case "update-payment":
        title = "Rental Bike | Confirm Payment";
        const { booking_id } = req.body;
        const payment = await Payment.findOne({
          where: { booking_id },
          raw: true,
        });
        return res.status(422).render("admin/confirm-payment", {
          layout: "layouts/main",
          title,
          formData: req.body,
          data: payment,
          path: "/payments",
          user: req.user,
          errors: errors.array(),
        });
    }
  }
  next();
};

module.exports = ValidationMiddleware;
