const { Router } = require("express");
const { CreateBicycle } = require("../Controllers/BicycleController");
const Verify = require("../Middleware/Verify");
const VerifyIsAdmin = require("../Middleware/VerifyIsAdmin");
const BikeValidation = require("../auth/bike-validation");
const ValidationMiddleware = require("../Middleware/ValidationMiddleware");

const router = Router();

router.post(
  "/add-new-bike",
  Verify,
  VerifyIsAdmin,
  [BikeValidation.addBike, ValidationMiddleware],
  CreateBicycle
);

module.exports = router;
