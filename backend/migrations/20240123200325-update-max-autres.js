

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.changeColumn('maxs', 'Autres', {
      type: Sequelize.DECIMAL(10, 2),
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('maxs', 'Autres', {
      type: Sequelize.INTEGER
    });
  },
};
