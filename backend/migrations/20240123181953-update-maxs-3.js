'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('maxs', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
      },
      year: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      PGE_L1: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
      },
      PGE_L2: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
      },
      PGE_L3: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
      },
      PGE_M1: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
      },
      PGE_M2: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
      },
      PEx_B1: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
      },
      PEx_B2: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
      },
      PEx_B3: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
      },
      PEx_MS1: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
      },
      PEx_MS2_Cyber: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
      },
      PEx_MS2_Optionnelle: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
