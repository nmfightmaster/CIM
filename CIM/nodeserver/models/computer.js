"use strict";
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/config.js");
const Computer = sequelize.define("Computer", {
  name: DataTypes.STRING,
  serviceTag: DataTypes.STRING,
  model: DataTypes.STRING,
  imagedOn: DataTypes.STRING,
  inInventory: DataTypes.INTEGER,
  isWiped: DataTypes.BOOLEAN,
  scriptRan: DataTypes.BOOLEAN,
  isRenamed: DataTypes.BOOLEAN,
  isUpdated: DataTypes.BOOLEAN,
  warranty: DataTypes.STRING,
});

module.exports = Computer;
