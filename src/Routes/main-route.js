const { Router } = require("express");
const {
  MainView,
  LoginView,
  SignupView,
  ForgotPasswordView,
} = require("../Controllers/MainController");
const { Register, Login } = require("../Controllers/UserController");

const router = Router();

router.get("/", MainView);
router.get("/login", LoginView);
router.get("/signup", SignupView);
router.get("/forgot-password", ForgotPasswordView);

// user routes
router.post("/register", Register);
router.post("/login", Login);

module.exports = router;
