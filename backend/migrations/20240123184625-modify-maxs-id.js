'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('maxs', 'id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      autoIncrement: true,

    });
  },

  async down (queryInterface, Sequelize) {
    // Logic to revert the changes if necessary
    await queryInterface.changeColumn('maxs', 'id', {
      type: Sequelize.INTEGER,
      allowNull: false,

      // Note: Removing autoIncrement in the down method can be complex and depends on the database and its state.
      // You might need to handle this depending on your specific requirements and database state.
    });
  }
};
