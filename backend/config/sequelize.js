// config/sequelize.js

const Sequelize = require('sequelize');

const sequelize = new Sequelize('posco', 'root', '', {
  host: 'localhost',
  dialect: 'mysql', // or another supported database
  logging: false,   // set to console.log to see the raw SQL queries
  // additional options
});

module.exports = sequelize;
