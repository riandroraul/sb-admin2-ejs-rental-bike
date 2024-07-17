const { Router } = require("express");
const AuthValidation = require("../auth/validation");
const {
  Register,
  Login,
  GetUsers,
  DeleteUser,
  UpdateProfile,
} = require("../Controllers/UserController");
const ValidationMiddleware = require("../Middleware/ValidationMiddleware");
const { sentJson } = require("../Controllers/PageController");
const VerifyIsAdmin = require("../Middleware/VerifyIsAdmin");
const Verify = require("../Middleware/Verify");
const { CreateBicycle } = require("../Controllers/BicycleController");
const {
  GetTransactionToken,
  TransactionNotification,
  ConfirmPayment,
} = require("../Controllers/PaymentController");
const upload = require("../utils/uploadFile");

const router = Router();

// user routes
router.post(
  "/register",
  [AuthValidation.register, ValidationMiddleware],
  Register
);
router.post("/login", [AuthValidation.login, ValidationMiddleware], Login);
router.post("/forgot-password", sentJson);
// router.get("/sent-json", sentJson);

router.get("/users", Verify, VerifyIsAdmin, GetUsers);
router.post(
  "/update-profile",
  Verify,
  [
    upload.single("profile_picture"),
    AuthValidation.updateProfile,
    ValidationMiddleware,
  ],
  UpdateProfile
);

router.delete("/delete-user/:userId", Verify, VerifyIsAdmin, DeleteUser);
router.post("/addNewBike", CreateBicycle);

// transaction
router.get("/transaction", Verify, GetTransactionToken);
router.post("/transaction/notif", Verify, TransactionNotification);
router.get("/confirm/:booking_id", Verify, VerifyIsAdmin, ConfirmPayment);

module.exports = router;
