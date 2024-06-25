const MainView = (req, res) => {
  res.render("home", { layout: "layouts/main", title: "Rental Bike" });
};

const LoginView = (req, res) => {
  res.render("login", { layout: "pages/main", title: "Rental Bike" });
};

const SignupView = (req, res) => {
  res.render("signup", { layout: "pages/main", title: "Rental Bike" });
};

const ForgotPasswordView = (req, res) => {
  res.render("forgot-password", { layout: "pages/main", title: "Rental Bike" });
};

module.exports = { MainView, LoginView, SignupView, ForgotPasswordView };
