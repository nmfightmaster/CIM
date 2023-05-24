const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbconfig");

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
});

 module.exports = Computer;

