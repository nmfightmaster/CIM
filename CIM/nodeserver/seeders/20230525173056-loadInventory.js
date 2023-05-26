'use strict';

const fs = require('fs');
const csv = require('csv-parser');
const { development } = require('../config/config');

module.exports = {
  async up(queryInterface, Sequelize) {
    const rows = [];

    return new Promise((resolve, reject) => {
      fs.createReadStream('./data/inventory.csv')
        .pipe(csv())
        .on('data', (row) => {
          rows.push(row);
        })
        .on('end', async () => {
          try {
            await queryInterface.bulkInsert('computers', rows);
            console.log('CSV file successfully processed');
            resolve();
          } catch (error) {
            reject(error);
          }
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('computers', null, {});
  }
};
