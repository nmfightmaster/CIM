const { Sequelize } = require('sequelize');
require('dotenv').config({ path: './.env' });
const { execSync } = require('child_process');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: 'localhost',
        dialect: 'mysql',
    }
);

sequelize.sync({ force:true }).then(() => {
    console.log('Connection has been established successfully.');
    try {
        execSync('npx sequelize-cli db:seed:all');
        console.log('Seeding successful');
    } catch (error) {
        console.log('Seeding failed');
    }
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });

 module.exports = sequelize;