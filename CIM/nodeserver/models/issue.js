"use strict";
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/config.js");

const Issue = sequelize.define("Issue", {
  description: DataTypes.STRING,
  loggedOn: DataTypes.STRING,
  initials: DataTypes.STRING,
  computerId: DataTypes.INTEGER,
});
module.exports = Issue;
