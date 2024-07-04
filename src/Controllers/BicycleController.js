const Bicycle = require("../db/models/bicycle");
const formatIDR = require("../utils/formatIDR");

const GetBicycles = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;
    const offset = (page - 1) * limit;

    const { count, rows } = await Bicycle.findAndCountAll({
      offset: offset,
      limit: limit,
    });

    const formattedBikes = rows.map((bike) => ({
      ...bike.dataValues,
      formattedPrice: formatIDR(bike.price),
    }));

    return res.status(200).render("bikes", {
      bikes: formattedBikes,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      layout: "layouts/main",
      title: "Rental Bike | Bikes",
      user: req.user,
      path: "/bikes",
      limit,
    });
  } catch (error) {
    console.log(error);
  }
};

const GetBicycleById = async (req, res) => {
  try {
    const { bike_id } = req.params;
    const bike = await Bicycle.findOne({ where: { bike_id }, raw: true });
    const formattedBike = {
      ...bike,
      formattedPrice: formatIDR(bike.price),
    };
    return res.render("check-booking", {
      layout: "layouts/main",
      bike: formattedBike,
      title: "Rental Bike | Booking",
      formData: req.body,
      user: req.user,
      path: "/bikes",
    });
  } catch (error) {
    console.log(error);
  }
};

const CreateBicycle = async (req, res) => {
  try {
    const created = await Bicycle.create(req.body);
    console.log(created);
    req.flash("errors", [{ success: true, msg: "Successfully, New Bike added!" }]);
    return res.redirect("/bikes");
  } catch (error) {
    console.log(error);
  }
};

const UpdateBicycle = async (req, res) => {
  try {
  } catch (error) {}
};

const DeleteBicycle = async (req, res) => {
  try {
  } catch (error) {}
};

module.exports = {
  GetBicycles,
  GetBicycleById,
  CreateBicycle,
  UpdateBicycle,
  DeleteBicycle,
};
