'use strict';
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/config.js');
  const computerModel = sequelize.define('computerModel', {
    name: DataTypes.STRING,
    serviceTag: DataTypes.STRING,
    model: DataTypes.STRING,
    status: DataTypes.STRING,
    imagedOn: DataTypes.STRING,
    inInventory: DataTypes.TINYINT,
    warranty: DataTypes.STRING,
    ou: DataTypes.STRING
  });

  module.exports = computerModel;
