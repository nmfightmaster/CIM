const { DataTypes } = require("sequelize");
require('dotenv').config({ path: './.env' });
const sequelize = require('../config/dbconfig');

const Computer = sequelize.define("computers", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    serviceTag: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    model: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    imagedOn: {
        type: DataTypes.STRING,
    },
    inInventory: {
        type: DataTypes.TINYINT,
        defaultValue: 1,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    }
});

 module.exports = Computer;

