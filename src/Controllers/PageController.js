const MainView = (req, res) => {
  const data = { name: "john doe", age: 34 };
  console.log(req.path);
  res.render("home", {
    layout: "layouts/main",
    user: req.user,
    path: "/main",
    data: JSON.stringify(data),
    title: "Rental Bike",
  });
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

module.exports = {
  MainView,
  LoginView,
  SignupView,
  ForgotPasswordView,
  DashboardView,
  Logout,
  sentJson,
};
