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
    tgl_booking: { type: DataTypes.DATE },
    jam_mulai: { type: DataTypes.TIME },
    jam_selesai: { type: DataTypes.TIME },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    underscored: false,
  }
);

Booking.hasMany(User, { foreignKey: "userId", as: "user" });
Booking.belongsTo(Bicycle, { foreignKey: "bike_id", as: "bicycle" });

module.exports = Booking;
