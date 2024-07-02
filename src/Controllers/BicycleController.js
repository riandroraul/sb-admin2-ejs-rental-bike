const Bicycle = require("../db/models/bicycle");
const { errorResult } = require("../utils/response");

const GetBicycles = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
  }
};

const GetBicycleById = async (req, res) => {
  try {
  } catch (error) {}
};

const CreateBicycle = async (req, res) => {
  try {
    await Bicycle.create(req.body);
    req.flash("errors", [{ success: true, msg: "Successfully, New Bike added!" }]);
    return res.redirect("/bikes");
  } catch (error) {
    return errorResult(error, res, 400, req.path);
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
