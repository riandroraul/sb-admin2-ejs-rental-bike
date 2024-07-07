const { Router } = require("express");
const {
  MainView,
  LoginView,
  SignupView,
  ForgotPasswordView,
  Logout,
  DashboardView,
  AddBikeView,
} = require("../Controllers/PageController");
const Verify = require("../Middleware/Verify");
const VerifyIsAdmin = require("../Middleware/VerifyIsAdmin");
const { DetailPayment } = require("../Controllers/PaymentController");

const router = Router();

router.get("/", DashboardView);
router.get("/login", LoginView);
router.get("/register", SignupView);
router.get("/forgot-password", ForgotPasswordView);
router.get("/logout", Logout);

router.get("/main", Verify, MainView);

router.get("/add-bike", Verify, VerifyIsAdmin, AddBikeView);

router.get("/payment-detail", Verify, DetailPayment);

module.exports = router;
