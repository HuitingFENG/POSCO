'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('questions', 'category', {
      type: Sequelize.INTEGER,
      allowNull: true, 
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('questions', 'category');
  },
};

