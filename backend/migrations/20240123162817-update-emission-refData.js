'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('emissions', 'refDataImpactCO2List', {
      type: Sequelize.JSON,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('emissions', 'refDataImpactCO2List');
  },
};

