require("dotenv").config({ path: "./.env" });
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: "localhost",
    dialect: "mysql",
    logging: false,
    // Other database options can be added here
  }
);

module.exports = {
  development: {
    dialect: "mysql",
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: "localhost",
    port: 3306,
    // Other development environment options can be added here
  },
  // Other environments (e.g., production, test) can be added here
};

module.exports.sequelize = sequelize;
