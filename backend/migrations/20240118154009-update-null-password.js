'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const saltRounds = 10;

    // Fetch users with null passwords
    const users = await queryInterface.sequelize.query(
      `SELECT userId, name FROM users WHERE password IS NULL`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    // Update each user's password with a hash of their username
    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.name, saltRounds);
      await queryInterface.sequelize.query(
        `UPDATE users SET password = '${hashedPassword}' WHERE userId = ${user.userId}`
      );
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Reverting this migration is not practical as original passwords are not recoverable
  }
};
