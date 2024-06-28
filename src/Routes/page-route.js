const { Router } = require("express");
const {
  MainView,
  LoginView,
  SignupView,
  ForgotPasswordView,
  Logout,
  DashboardView,
} = require("../Controllers/PageController");
const Verify = require("../Middleware/Verify");

const router = Router();

router.get("/", Verify, DashboardView);
router.get("/main", Verify, MainView);
router.get("/login", LoginView);
router.get("/register", SignupView);
router.get("/forgot-password", ForgotPasswordView);
router.get("/logout", Logout);

module.exports = router;
