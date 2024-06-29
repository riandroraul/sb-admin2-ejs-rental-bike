"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Booking_statuses", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      booking_status_id: {
        type: Sequelize.INTEGER,
      },
      bike_id: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.ENUM("Selesai", "Menunggu Pembayaran", "Sudah dibayar"),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Booking_statuses");
  },
};
