require('dotenv').config();
const mysql = require('mysql2');

// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',  // insert password if needed
//   database: 'posco'
// });


let connection;

if (process.env.JAWSDB_URL) {
    // Parse the JAWSDB_URL to extract necessary components
    const match = process.env.JAWSDB_URL.match(/mysql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/([^?]+)/);
    connection = mysql.createConnection({
        host: match[3],
        user: match[1],
        password: match[2],
        database: match[5]
    });
} else {
    connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',  // insert password if needed
        database: 'posco'
    });
}


/* connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});
 */

module.exports = connection;

