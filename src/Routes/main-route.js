const { Router } = require("express");
const {
  MainView,
  LoginView,
  SignupView,
  ForgotPasswordView,
} = require("../Controllers/MainController");

const router = Router();

router.get("/", MainView);
router.get("/login", LoginView);
router.get("/signup", SignupView);
router.get("/forgot-password", ForgotPasswordView);

module.exports = router;
