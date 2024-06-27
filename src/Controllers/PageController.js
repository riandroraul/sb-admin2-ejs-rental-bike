const MainView = (req, res) => {
  res.render("home", { layout: "layouts/main", title: "Rental Bike" });
};

const LoginView = (req, res) => {
  res.render("login", { layout: "public-pages/main", title: "Rental Bike | Login" });
};

const SignupView = (req, res) => {
  res.render("signup", {
    layout: "public-pages/main",
    title: "Rental Bike | Registration",
  });
};

const ForgotPasswordView = (req, res) => {
  res.render("forgot-password", {
    layout: "public-pages/main",
    title: "Rental Bike | Forgot Password",
  });
};

module.exports = { MainView, LoginView, SignupView, ForgotPasswordView };
