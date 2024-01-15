'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Remove the default 'id' column
    await queryInterface.removeColumn('users', 'id');

    // Modify 'userId' column to be primary key and auto-incremented
    await queryInterface.changeColumn('users', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Add back the default 'id' column
    await queryInterface.addColumn('users', 'id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    });

    // Revert 'userId' modifications
    await queryInterface.changeColumn('users', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      autoIncrement: false
    });
  }
};
