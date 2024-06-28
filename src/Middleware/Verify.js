const jwt = require("jsonwebtoken");

const Verify = async (req, res, next) => {
  try {
    const authHeader = req.headers["cookie"];
    if (!authHeader) {
      res.status(401);
      // return res.redirect("/login");
    }
    const cookie = req.cookies.SessionID;
    const decode = jwt.verify(cookie, process.env.ACCESS_TOKEN);
    req.user = decode;
    next();
  } catch (error) {
    return res.status(401).render("login", {
      title: "Rental Bike | Login",
      layout: "public-pages/main",
      errors: [{ success: false, msg: "This session has expired. Please login" }],
    });
  }
};

module.exports = Verify;
