"use strict";
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/config.js");
const computerModel = sequelize.define("computerModel", {
  name: DataTypes.STRING,
  serviceTag: DataTypes.STRING,
  model: DataTypes.STRING,
  status: DataTypes.STRING,
  imagedOn: DataTypes.STRING,
  //inInventory status numbers correlate to specific statuses that will be decided later so I can add more as needed
  inInventory: DataTypes.INTEGER,
  warranty: DataTypes.STRING,
});

module.exports = computerModel;
