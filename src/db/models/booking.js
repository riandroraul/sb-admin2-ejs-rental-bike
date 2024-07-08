const { Model, DataTypes } = require("sequelize");
const sequelizeConnection = require("../../config/db-connect");
const User = require("./user");
const Bicycle = require("./bicycle");

class Booking extends Model {}

Booking.init(
  {
    booking_id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    bike_id: {
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    booking_date: { type: DataTypes.DATE },
    time_start: { type: DataTypes.TIME },
    time_end: { type: DataTypes.TIME },
    total_amount: { type: DataTypes.STRING },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    underscored: false,
  }
);

Booking.belongsTo(User, { foreignKey: "userId", as: "user" });
Booking.belongsTo(Bicycle, { foreignKey: "bike_id", as: "bicycle" });

module.exports = Booking;
