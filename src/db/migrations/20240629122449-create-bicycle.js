"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Bicycles", {
      bike_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      bike_name: {
        type: Sequelize.STRING,
      },
      harga: {
        type: Sequelize.STRING,
      },
      baterai: {
        type: Sequelize.STRING,
      },
      tahun: {
        type: Sequelize.STRING,
      },
      desc: {
        type: Sequelize.TEXT,
      },
      motor: {
        type: Sequelize.STRING,
      },
      kecepatan_maks: {
        type: Sequelize.STRING,
      },
      shifter: {
        type: Sequelize.STRING,
      },
      bobot: {
        type: Sequelize.INTEGER,
      },
      url_image: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("Bicycles");
  },
};
