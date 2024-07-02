const Bicycle = require("../db/models/bicycle");
const { errorResult } = require("../utils/response");

const GetBicycles = async (req, res) => {
  try {
    console.log(req.body);
    return res.status(200).json(req.body);
    // res.render("admin/add-bike", {
    //   layout: "layouts/main",
    //   title: "Rental Bike | Add Bike",
    //   user: req.user,
    //   path: "/bikes",
    // });
    // const created = await Bicycle.create(req.body);
    // console.log(created);
    // req.flash("errors", [{ success: true, msg: "Successfully, New Bike added!" }]);
    // return res.redirect("/bikes");
  } catch (error) {
    console.log(error);
    // return errorResult(error, res, 400, req.path);
  }
};

const GetBicycleById = async (req, res) => {
  try {
  } catch (error) {}
};

const CreateBicycle = async (req, res) => {
  try {
  } catch (error) {}
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
