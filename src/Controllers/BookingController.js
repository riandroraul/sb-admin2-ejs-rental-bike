const Bicycle = require("../db/models/bicycle");
const Booking = require("../db/models/booking");
const Payment = require("../db/models/payment");
const formatDate = require("../utils/formatDate");
const formatIDR = require("../utils/formatIDR");
const crypto = require("crypto");

const GetBookings = async (req, res) => {
  try {
    const { userId } = req.user;
    const bookings = await Booking.findAll({
      where: { userId: parseInt(userId) },
      include: [{ model: Bicycle, as: "bicycle" }],
      raw: true,
    });
    bookings.map((el) => (el.booking_date = formatDate(el.booking_date, true)));
    bookings.map((el) => (el.total_amount = formatIDR(el.total_amount, false)));
    return res.status(200).render("booking-list", {
      layout: "layouts/main",
      title: "Rental Bike | Booking List",
      path: "/booking-list",
      bookings,
      user: req.user,
      formData: req.body,
    });
  } catch (error) {
    console.log(error);
  }
};

const CreateBooking = async (req, res) => {
  try {
    console.log(req.body);
    let { userId, bike_id, booking_date, time_start, time_end, total_amount } =
      req.body;
    const totalAmountToNumber = total_amount.replace(/[IDR\s,.]/g, "");
    const data = {
      userId,
      bike_id,
      booking_date,
      time_start,
      time_end,
      total_amount: totalAmountToNumber,
    };
    const createBooking = await Booking.create(data, { raw: true });
    const createPayment = await Payment.create(
      {
        transaction_id: crypto.randomUUID(),
        total_amount: totalAmountToNumber,
        booking_id: createBooking.booking_id,
      },
      { raw: true }
    );
    // console.log({ createBooking });
    // console.log({ createPayment });
    req.flash("errors", [{ success: true, msg: "Booking Added Successfully" }]);
    res.redirect("/booking-list");
  } catch (error) {
    console.log(error);
  }
};

const DeleteBookingAndPayment = async (req, res) => {
  try {
    const { booking_id } = req.params;
    const paymentDeleted = await Payment.destroy({ where: { booking_id } });
    const bookingDeleted = await Booking.destroy({ where: { booking_id } });
    console.log({ paymentDeleted, bookingDeleted });
    req.flash("errors", [
      { success: true, msg: "Data Booking Deleted Successfully" },
    ]);
    return res.status(200).json({ msg: "Data booking deleted!" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { CreateBooking, GetBookings, DeleteBookingAndPayment };
