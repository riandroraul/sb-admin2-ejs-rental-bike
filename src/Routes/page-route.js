const { Router } = require("express");
const {
  MainView,
  LoginView,
  SignupView,
  ForgotPasswordView,
  Logout,
  DashboardView,
  AddBikeView,
  UpdateProfilePage,
} = require("../Controllers/PageController");
const Verify = require("../Middleware/Verify");
const VerifyIsAdmin = require("../Middleware/VerifyIsAdmin");
const {
  DetailPayment,
  GetPayments,
  UpdatePayment,
} = require("../Controllers/PaymentController");
const PaymentValidator = require("../auth/payment-validation");
const ValidationMiddleware = require("../Middleware/ValidationMiddleware");

const router = Router();

router.get("/", DashboardView);
router.get("/login", LoginView);
router.get("/register", SignupView);
router.get("/forgot-password", ForgotPasswordView);
router.get("/logout", Logout);

router.get("/main", Verify, MainView);
router.get("/edit-profile", Verify, UpdateProfilePage);

router.get("/add-bike", Verify, VerifyIsAdmin, AddBikeView);

// payment route
router.get("/payment-detail/:booking_id", Verify, DetailPayment);

router.get("/payments", Verify, VerifyIsAdmin, GetPayments);
router.post(
  "/update-payment",
  Verify,
  VerifyIsAdmin,
  [PaymentValidator.ConfirmPayment, ValidationMiddleware],
  UpdatePayment
);

module.exports = router;
