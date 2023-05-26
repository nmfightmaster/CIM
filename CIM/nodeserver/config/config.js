require('dotenv').config({ path: './.env' });

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: 'localhost',
    dialect: 'mysql',
  }
};