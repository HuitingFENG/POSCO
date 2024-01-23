'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.addColumn('maxs', 'Autres', {
      type: Sequelize.INTEGER,
    });
  },

  down: async (queryInterface, Sequelize) => {

  },
};
