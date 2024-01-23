'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Clear the 'responses' table
    await queryInterface.bulkDelete('maxs', null, {});

  },

  down: async (queryInterface, Sequelize) => {
    // The down method is optional and often not implemented for data clear migrations.
  }
};

