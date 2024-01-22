'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
/*     await queryInterface.addColumn('questions', 'type', {
      type: Sequelize.STRING,
      allowNull: true, 
    }); */
    await queryInterface.addColumn('emissions', 'subConsummationEmissions', {
      type: Sequelize.JSON,
    });
    await queryInterface.addColumn('emissions', 'subCountryEmissions', {
      type: Sequelize.JSON,
    });
  },

  down: async (queryInterface, Sequelize) => {
   /*  await queryInterface.removeColumn('questions', 'type'); */
    await queryInterface.removeColumn('emissions', 'subConsummationEmissions');
    await queryInterface.removeColumn('emissions', 'subCountryEmissions');
    
  },
};

