const Bicycle = require("../db/models/bicycle");
const Booking = require("../db/models/booking");
const formatDate = require("../utils/formatDate");
const formatIDR = require("../utils/formatIDR");

const GetBookings = async (req, res) => {
  try {
    const { userId } = req.user;
    const bookings = await Booking.findAll({
      where: { userId },
      include: [{ model: Bicycle, as: "bicycle" }],
      raw: true,
    });
    bookings.map((el) => (el.booking_date = formatDate(el.booking_date, true)));
    bookings.map((el) => (el.total_amount = formatIDR(el.total_amount, false)));
    console.log(bookings);
    return res.status(200).render("booking-list", {
      layout: "layouts/main",
      title: "Rental Bike | Booking List",
      path: "/booking-list",
      bookings,
      user: req.user,
    });
  } catch (error) {
    console.log(error);
  }
};

const CreateBooking = async (req, res) => {
  try {
    console.log(req.body);
    let { userId, bike_id, booking_date, time_start, time_end, total_amount } = req.body;
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
    console.log(createBooking);
    req.flash("errors", [{ success: true, msg: "Booking Added Successfully" }]);
    res.redirect("/bikes");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { CreateBooking, GetBookings };
