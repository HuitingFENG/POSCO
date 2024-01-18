'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.changeColumn('emissions', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'users', // Note: This should match the table name, not the model name
        key: 'userId',
      }
    });
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.changeColumn('emissions', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: null
    });
  },
};

