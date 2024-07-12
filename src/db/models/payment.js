const { Model, DataTypes } = require("sequelize");
const sequelizeConnection = require("../../config/db-connect");
const Booking = require("./booking");

class Payment extends Model {}

Payment.init(
  {
    payment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    transaction_id: {
      type: DataTypes.STRING,
    },
    booking_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
    },
    total_amount: {
      type: DataTypes.STRING,
    },
    payment_date: {
      type: DataTypes.DATE,
    },
    rental_status: {
      type: DataTypes.STRING,
      defaultValue: "NOT RETURNED",
    },
    payment_method: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    underscored: false,
    sequelize: sequelizeConnection,
  }
);

Payment.belongsTo(Booking, { as: "bookings", foreignKey: "booking_id" });

module.exports = Payment;
