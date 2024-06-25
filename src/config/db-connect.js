const { Sequelize } = require("sequelize");
const { development } = require("./database");

const { username, host, database, password } = development;
const sequelize = new Sequelize(database, username, password, {
  host,
  dialect: "mysql",
});

const testDBConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("database: Connection successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

testDBConnection();
