// var mysql = require('mysql');
// var connection;

// if (process.env.JAWSDB_URL) {
//     connection = mysql.createConnection(process.env.JAWSDB_URL);
// } else {
//     connection = mysql.createConnection({
//         host: 'localhost',
//         user: 'root',
//         password: 'Progress_19',
//         database: 'exampledb'
//     });
// };

// connection.connect();
// module.exports = connection;
/* end original */



// Dependencies
var Sequelize = require("sequelize");

// Creates mySQL connection using Sequelize, the empty string in the third argument spot is our password.
var sequelize = new Sequelize("tournament_db", "root", "Progress_19", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
  options: {
    operatorsAliases: false
  },
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

// Exports the connection for other files to use
module.exports = sequelize;