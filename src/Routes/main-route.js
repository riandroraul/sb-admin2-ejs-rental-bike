const { Router } = require("express");
const AuthValidation = require("../auth/validation");
const {
  Register,
  Login,
  GetUsers,
  DeleteUser,
} = require("../Controllers/UserController");
const ValidationMiddleware = require("../Middleware/ValidationMiddleware");
const { sentJson } = require("../Controllers/PageController");
const VerifyIsAdmin = require("../Middleware/VerifyIsAdmin");
const Verify = require("../Middleware/Verify");

const router = Router();

// user routes
router.post("/register", [AuthValidation.register, ValidationMiddleware], Register);
router.post("/login", [AuthValidation.login, ValidationMiddleware], Login);
router.post("/forgot-password", sentJson);
// router.get("/sent-json", sentJson);

router.get("/users", Verify, VerifyIsAdmin, GetUsers);
router.delete("/delete-user/:userId", Verify, VerifyIsAdmin, DeleteUser);

module.exports = router;
