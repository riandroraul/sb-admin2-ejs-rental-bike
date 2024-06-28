const jwt = require("jsonwebtoken");

const LoginAuth = async (req, res, next) => {
  const token = req.session.data;
  console.log(token);
  if (!token) {
    return res.redirect("/login");
  }
  try {
    req.user = jwt.verify(token, process.env.ACCESS_TOKEN);
    console.log(req.user);
    next();
  } catch (error) {
    res.redirect("/login");
  }
};

module.exports = LoginAuth;
