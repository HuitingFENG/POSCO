// config/sequelize.js
require('dotenv').config();
const Sequelize = require('sequelize');

// const sequelize = new Sequelize('posco', 'root', '', {
//   host: 'localhost',
//   dialect: 'mysql', // or another supported database
//   logging: false,   // set to console.log to see the raw SQL queries
//   // additional options
// });


let sequelize;

if (process.env.JAWSDB_URL) {
    // Parse the JAWSDB_URL to extract necessary components
    const match = process.env.JAWSDB_URL.match(/mysql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/([^?]+)/);
    sequelize = new Sequelize(match[5], match[1], match[2], {
        host: match[3],
        dialect: 'mysql',
        logging: false
    });
} else {
    sequelize = new Sequelize('posco', 'root', '', {
        host: 'localhost',
        dialect: 'mysql',
        logging: false
    });
}


module.exports = sequelize;
