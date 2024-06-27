const { validationResult } = require("express-validator");

const ValidationMiddleware = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const path = req.path.replace("/", "");
    let title = "";
    switch (path) {
      case "login":
        title = "Rental Bike | Login";
        return res.status(400).render("login", {
          layout: "public-pages/main",
          title,
          errors: errors.array(),
        });
      case "register":
        title = "Rental Bike | Registration";
        return res.status(400).render("signup", {
          layout: "public-pages/main",
          title,
          errors: errors.array(),
        });
      case "forgot-password":
        title = "Rental Bike | Forgot Password";
        return res.status(400).render("forgot-password", {
          layout: "public-pages/main",
          title,
          errors: errors.array(),
        });
    }
  }
  next();
};

module.exports = ValidationMiddleware;
