'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('responses', 'tempId', {
      type: Sequelize.UUID,
      allowNull: true,
    });
    await queryInterface.changeColumn('responses', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('responses', 'tempId');
    await queryInterface.changeColumn('responses', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },
};
