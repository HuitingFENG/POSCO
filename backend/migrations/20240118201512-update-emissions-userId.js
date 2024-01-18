'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // await queryInterface.addColumn('emissions', 'tempId', {
    //   type: Sequelize.UUID,
    //   allowNull: true,
    // });
    await queryInterface.addColumn('emissions', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    // Removed the part that adds a foreign key constraint
  },

  down: async (queryInterface, Sequelize) => {
    // await queryInterface.removeColumn('emissions', 'tempId');
    await queryInterface.removeColumn('emissions', 'userId');
    // Removed the part that removes a foreign key constraint
  },
};

