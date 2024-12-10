const formatDate = require("../utils/formatDate");

const MainView = (req, res) => {
  const user = req.user;
  const view = user.role == 1 ? "admin/dashboard" : "users/dashboard";
  res.render(view, {
    layout: "layouts/main",
    user,
    member_since: formatDate(user.member_since),
    path: "/main",
    formData: req.body,
    title: "Rental Bike | Dashboard",
  });
};

const LoginView = (req, res) => {
  res.render("login", {
    layout: "public-pages/main",
    title: "Rental Bike | Login",
    formData: req.body,
    errors: [],
  });
};

const SignupView = (req, res) => {
  res.render("signup", {
    layout: "public-pages/main",
    title: "Rental Bike | Registration",
    formData: req.body,
    errors: [],
  });
};

const ForgotPasswordView = (req, res) => {
  res.render("forgot-password", {
    layout: "public-pages/main",
    title: "Rental Bike | Forgot Password",
    formData: req.body,
  });
};

const DashboardView = (req, res) => {
  res.render("landing-page", {
    layout: "public-pages/main",
    title: "Rental Bike | Dashboard",
  });
};

const Logout = async (req, res) => {
  res.clearCookie("SessionID"); // Menghapus cookie yang menyimpan token JWT
  return res.redirect("/login");
};

const sentJson = (req, res) => {
  res.json({ nama: "John Doe", umur: 28 });
  return res.redirect("/login");
};

const BikesView = (req, res) => {
  res.render("bikes", {
    layout: "layouts/main",
    title: "Rental Bike | Bikes",
    user: req.user,
    path: "/bikes",
  });
};

const AddBikeView = (req, res) => {
  res.render("admin/add-bike", {
    layout: "layouts/main",
    title: "Rental Bike | Add Bike",
    user: req.user,
    path: "/bikes",
    formData: {},
  });
};

module.exports = {
  MainView,
  LoginView,
  SignupView,
  ForgotPasswordView,
  DashboardView,
  Logout,
  sentJson,
  BikesView,
  AddBikeView,
};
