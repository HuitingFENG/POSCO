'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    // Logic for transforming the database
    await queryInterface.dropTable('maxs');
  },

  async down (queryInterface, Sequelize) {
    // Logic for reverting the changes
    // If you have a previous 'createTable' migration, you can put the logic here
  }
};
