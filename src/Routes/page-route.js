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
const VerifyIsAdmin = require("../Middleware/VerifyIsAdmin");
const { GetUsers, DeleteUser } = require("../Controllers/UserController");

const router = Router();

router.get("/", DashboardView);
router.get("/login", LoginView);
router.get("/register", SignupView);
router.get("/forgot-password", ForgotPasswordView);
router.get("/logout", Logout);

router.get("/main", Verify, MainView);

router.get("/users", Verify, VerifyIsAdmin, GetUsers);
router.delete("/delete-user/:userId", Verify, VerifyIsAdmin, DeleteUser);

module.exports = router;
