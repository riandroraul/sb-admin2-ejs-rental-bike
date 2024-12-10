const { Model, DataTypes } = require("sequelize");
const sequelizeConnection = require("../../config/db-connect");

class Bicycle extends Model {}

Bicycle.init(
  {
    bike_id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    bike_name: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.STRING,
    },
    battery: {
      type: DataTypes.STRING,
    },
    year: {
      type: DataTypes.STRING,
    },
    desc: {
      type: DataTypes.TEXT,
    },
    motor: {
      type: DataTypes.STRING,
    },
    max_speed: {
      type: DataTypes.STRING,
    },
    shifter: {
      type: DataTypes.STRING,
    },
    weight: {
      type: DataTypes.INTEGER,
    },
    url_image: {
      type: DataTypes.STRING,
    },
  },

  {
    timestamps: true,
    sequelize: sequelizeConnection,
    underscored: false,
  }
);

module.exports = Bicycle;
