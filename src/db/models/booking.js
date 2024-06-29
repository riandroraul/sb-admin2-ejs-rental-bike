const { Model, DataTypes } = require("sequelize");
const sequelizeConnection = require("../../config/db-connect");
const User = require("./user");

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

Booking.belongsTo(User);

module.exports = Booking;
