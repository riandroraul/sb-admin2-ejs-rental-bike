const { Router } = require("express");
const {
  CreateBicycle,
  GetBicycles,
  GetBicycleById,
} = require("../Controllers/BicycleController");
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

router.get("/bikes", Verify, GetBicycles);
router.get("/bike/:bike_id", Verify, GetBicycleById);

module.exports = router;
