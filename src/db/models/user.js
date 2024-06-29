const { Model, DataTypes } = require("sequelize");
const sequelizeConnection = require("../../config/db-connect");
const jwt = require("jsonwebtoken");
const Booking = require("./booking");

class User extends Model {
  generateAccessJwt() {
    const payload = {
      userId: this.userId,
      email: this.email,
      name: this.name,
      role: this.role,
    };
    return jwt.sign(payload, process.env.ACCESS_TOKEN, { expiresIn: "1d" });
  }
}

User.init(
  {
    userId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    role: {
      allowNull: false,
      type: DataTypes.BIGINT,
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    underscored: false,
  }
);

User.hasMany(Booking, { foreignKey: "userId" });

module.exports = User;
