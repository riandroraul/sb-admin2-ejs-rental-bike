const { body } = require("express-validator");

module.exports = {
  bookingNow: [
    body("booking_date").custom((value) => {
      if (!value) {
        throw new Error("Booking date is required");
      }
      const today = new Date();
      const bookingDate = new Date(value);
      today.setHours(0, 0, 0, 0);

      if (bookingDate < today) {
        throw new Error("Booking date must be today or later");
      }
      return true;
    }),

    body("time_start")
      .notEmpty()
      .withMessage("Time start is required")
      .custom((value) => {
        const [startHour, startMinute] = value.split(":").map(Number);

        if (startMinute !== 0) {
          throw new Error("Minute in time start must be 00");
        }

        if (startHour < 7 || startHour >= 16 || (startHour === 16 && startMinute == 0)) {
          throw new Error("Time start must be between 07:00 and 16:00");
        }
        return true;
      }),

    body("time_end")
      .notEmpty()
      .withMessage("Time end is required")

      .custom((value, { req }) => {
        const timeStart = req.body.time_start;
        const [startHour, startMinute] = timeStart.split(":").map(Number);
        const [endHour, endMinute] = value.split(":").map(Number);

        if (endMinute !== 0) {
          throw new Error("Minute in time end must be 00");
        }

        if (endHour < 8 || endHour >= 17 || (endHour === 17 && endMinute == 0)) {
          throw new Error("Time end must be between 08:00 and 17:00");
        }

        const startTimeInMinutes = startHour * 60 + startMinute;
        const endTimeInMinutes = endHour * 60 + endMinute;

        if (endTimeInMinutes <= startTimeInMinutes) {
          throw new Error("End time must be greater than start time");
        }

        return true; // Indicates the validation passed
      }),
  ],
};
