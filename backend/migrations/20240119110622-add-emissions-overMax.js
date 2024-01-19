'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
/*     await queryInterface.addColumn('questions', 'type', {
      type: Sequelize.STRING,
      allowNull: true, 
    }); */
    await queryInterface.addColumn('emissions', 'overMax', {
      type: Sequelize.DataTypes.BOOLEAN,
      // allowNull: true, 
    });
  },

  down: async (queryInterface, Sequelize) => {
   /*  await queryInterface.removeColumn('questions', 'type'); */
    await queryInterface.removeColumn('emissions', 'overMax');
  },
};

