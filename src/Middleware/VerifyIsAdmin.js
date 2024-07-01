const VerifyIsAdmin = (req, res, next) => {
  try {
    const user = req.user;
    if (user.role !== 1) {
      return res.redirect("/main");
    }
    next();
  } catch (error) {
    console.log("verifiy is admin: ", error);
  }
};

module.exports = VerifyIsAdmin;
