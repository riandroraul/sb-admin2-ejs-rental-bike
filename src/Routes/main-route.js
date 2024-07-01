const { Router } = require("express");
const AuthValidation = require("../auth/validation");
const { Register, Login } = require("../Controllers/UserController");
const ValidationMiddleware = require("../Middleware/ValidationMiddleware");
const { sentJson } = require("../Controllers/PageController");

const router = Router();

// user routes
router.post("/register", [AuthValidation.register, ValidationMiddleware], Register);
router.post("/login", [AuthValidation.login, ValidationMiddleware], Login);
router.post("/forgot-password", sentJson);
// router.get("/sent-json", sentJson);
module.exports = router;
