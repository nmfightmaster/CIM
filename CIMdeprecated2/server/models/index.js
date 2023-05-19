const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    // pool configuration
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

// create db object
const db = {};

// add Sequelize and sequelize to db object
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// add models to db object
db.computers = require("./computer.model.js")(sequelize, Sequelize);

// export db object
module.exports = db;