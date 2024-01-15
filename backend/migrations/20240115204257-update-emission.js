'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('emissions', 'totalConsummationEmissions', {
      type: Sequelize.DECIMAL(10,2),
    });
    await queryInterface.addColumn('emissions', 'totalCountryEmissions', {
      type: Sequelize.DECIMAL(10,2),
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('emissions', 'totalConsummationEmissions');
    await queryInterface.removeColumn('emissions', 'totalCountryEmissions');
  }
};



// backend: sequelize migration:generate --name update-category
// backend: sequelize db:migrate --name 20240114185520-update-category
// backend: node ./scripts/insertQuestions.js    