'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class computerModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  computerModel.init({
    name: DataTypes.STRING,
    serviceTag: DataTypes.STRING,
    model: DataTypes.STRING,
    status: DataTypes.STRING,
    imagedOn: DataTypes.STRING,
    inInventory: DataTypes.STRING,
    warranty: DataTypes.STRING,
    ou: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'computerModel',
  });
  return computerModel;
};