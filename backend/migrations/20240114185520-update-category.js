'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('questions', 'category', {
      type: Sequelize.INTEGER,
      allowNull: true, 
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('questions', 'category');
  },
};

// backend: sequelize migration:generate --name update-category
// backend: sequelize db:migrate --name 20240114185520-update-category
// backend: node ./scripts/insertQuestions.js    