const { Model, DataTypes } = require("sequelize");
const sequelizeConnection = require("../../config/db-connect");
const Booking = require("./booking");

class Booking_status extends Model {}

Booking_status.init(
  {
    booking_status_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    booking_id: { type: DataTypes.INTEGER },
    status: { type: DataTypes.STRING },
  },
  {
    sequelize: sequelizeConnection,
    timestamps: true,
    underscored: false,
  }
);

Booking_status.hasOne(Booking, { foreignKey: "booking_id" });

module.exports = Booking_status;
