'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('computerModels', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      serviceTag: {
        type: Sequelize.STRING
      },
      model: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      imagedOn: {
        type: Sequelize.STRING
      },
      inInventory: {
        type: Sequelize.STRING
      },
      warranty: {
        type: Sequelize.STRING
      },
      ou: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('computerModels');
  }
};