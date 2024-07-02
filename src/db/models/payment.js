const { Model, DataTypes } = require("sequelize");
const sequelizeConnection = require("../../config/db-connect");
const Booking = require("./booking");

class Payment extends Model {}

Payment.init(
  {
    payment_id: {
      type: DataTypes.STRING,
    },
    booking_id: {
      type: Sequelize.INTEGER,
    },
    status: {
      type: Sequelize.STRING,
    },
    total_amount: {
      type: Sequelize.STRING,
    },
    payment_date: {
      type: Sequelize.DATE,
    },
    payment_method: {
      type: Sequelize.STRING,
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
