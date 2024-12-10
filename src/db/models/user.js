const { Model, DataTypes } = require("sequelize");
const sequelizeConnection = require("../../config/db-connect");
const jwt = require("jsonwebtoken");
const dayjs = require("dayjs");

require("dayjs/locale/id");
dayjs.locale("id");

class User extends Model {
  generateAccessJwt() {
    const payload = {
      userId: this.userId,
      email: this.email,
      name: this.name,
      role: this.role,
      member_since: this.createdAt,
    };
    return jwt.sign(payload, process.env.ACCESS_TOKEN, { expiresIn: "1d" });
  }
}

sequelizeConnection.def;

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
    createdAt: {
      type: DataTypes.DATE,
      get() {
        return dayjs(this.getDataValue("createdAt")).format(
          "D MMMM YYYY HH:mm:ss"
        );
      },
    },
    updatedAt: {
      type: DataTypes.DATE,
      get() {
        return dayjs(this.getDataValue("updatedAt")).format(
          "D MMMM YYYY HH:mm:ss"
        );
      },
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    underscored: false,
  }
);

// User.hasMany(Booking, { as: "bookings", foreignKey: "userId" });

module.exports = User;
