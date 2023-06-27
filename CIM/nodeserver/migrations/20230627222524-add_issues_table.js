"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("issues", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      description: { type: Sequelize.STRING },
      loggedOn: { type: Sequelize.STRING },
      initials: { type: Sequelize.STRING },
      computerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "computers",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("issues");
  },
};
