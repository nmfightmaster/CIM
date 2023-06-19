'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Computers', {
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
      imagedOn: {
        type: Sequelize.STRING
      },
      inInventory: {
        type: Sequelize.INTEGER
      },
      isWiped: {
        type: Sequelize.BOOLEAN
      },
      scriptRan: {
        type: Sequelize.BOOLEAN
      },
      isRenamed: {
        type: Sequelize.BOOLEAN
      },
      isUpdated: {
        type: Sequelize.BOOLEAN
      },
      warranty: {
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
    await queryInterface.dropTable('Computers');
  }
};