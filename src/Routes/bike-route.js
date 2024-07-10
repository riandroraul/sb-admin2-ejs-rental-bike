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
const bookingValidation = require("../auth/booking-validation");
const {
  CreateBooking,
  GetBookings,
  DeleteBookingAndPayment,
} = require("../Controllers/BookingController");
const { route } = require("./main-route");

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

// booking route
router.get("/booking-list", Verify, GetBookings);
router.post(
  "/book-now",
  Verify,
  [bookingValidation.bookingNow, ValidationMiddleware],
  CreateBooking
);

router.delete("/delete-booking/:booking_id", Verify, DeleteBookingAndPayment);
module.exports = router;
