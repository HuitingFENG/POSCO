'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('DELETE FROM `users` WHERE `userId` >= 4');
  },

  down: async (queryInterface, Sequelize) => {
    // The down method is optional. If reversing this migration is necessary, you would re-insert the deleted records here.
  }
};
