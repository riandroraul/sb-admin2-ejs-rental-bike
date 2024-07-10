const { check } = require("express-validator");

module.exports = {
  ConfirmPayment: [
    check("transaction_id").notEmpty().withMessage("Transaction ID is required"),
    check("booking_id").notEmpty().withMessage("Booking ID is required"),
    check("status")
      .notEmpty()
      .withMessage("Status is required")
      .isIn(["PAID", "UNPAID"])
      .withMessage("Status must be either PAID or UNPAID"),
    check("payment_date").notEmpty().withMessage("Payment Date is required"),
    check("payment_amount").notEmpty().withMessage("Payment amount is required"),
  ],
};
