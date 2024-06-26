const { Sequelize } = require("sequelize");
const { development } = require("./database");

const { username, host, database, password } = development;
const sequelizeConnection = new Sequelize(database, username, password, {
  host,
  dialect: "mysql",
});

const testDBConnection = async () => {
  try {
    await sequelizeConnection.authenticate();
    console.log("database: Connection successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

testDBConnection();

module.exports = sequelizeConnection;
