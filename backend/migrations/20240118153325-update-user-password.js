'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const saltRounds = 10;

    // Fetch all users
    const users = await queryInterface.sequelize.query(
      'SELECT userId, password FROM users WHERE password IS NOT NULL AND password NOT LIKE "$2b$%"',
      { type: Sequelize.QueryTypes.SELECT }
    );

    // Hash and update each user's password
    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, saltRounds);
      await queryInterface.sequelize.query(
        `UPDATE users SET password = '${hashedPassword}' WHERE userId = ${user.userId}`
      );
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Reverting this migration is not practical as original passwords cannot be restored
  },
};
