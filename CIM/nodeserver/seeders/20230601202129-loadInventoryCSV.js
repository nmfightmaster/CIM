"use strict";
const fs = require("fs");
const path = require("path");
const { getWarrantyInfo } = require("../utils/dellApi.js");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const csvData = fs.readFileSync(
      path.join(__dirname, "..", "data", "inventory.csv"),
      "utf8"
    );
    const rows = csvData.trim().split("\n").slice(1); // Exclude header row

    const data = [];

    for (const row of rows) {
      const [name, serviceTag, model] = row.split(",");

      const warranty = await getWarrantyInfo(serviceTag);

      const computerData = {
        name,
        serviceTag,
        model,
        imagedOn: null,
        inInventory: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        warranty: warranty,
        isWiped: false,
        scriptRan: false,
        isRenamed: false,
        isUpdated: false,
      };

      data.push(computerData);
    }

    await queryInterface.bulkInsert("computers", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("computers", null, {});
  },
};
