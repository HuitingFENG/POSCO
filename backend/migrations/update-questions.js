'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
/*     await queryInterface.addColumn('questions', 'type', {
      type: Sequelize.STRING,
      allowNull: true, 
    }); */
    await queryInterface.addColumn('questions', 'options', {
      type: Sequelize.JSON,
      allowNull: true, 
    });
  },

  down: async (queryInterface, Sequelize) => {
   /*  await queryInterface.removeColumn('questions', 'type'); */
    await queryInterface.removeColumn('questions', 'options');
  },
};

