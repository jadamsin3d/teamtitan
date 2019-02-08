// Sequelize (capital) references the standard library
var Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
var sequelize = require("../config/connection.js");


// Creates a "Tournament" model that matches up with DB
var Tournament = sequelize.define("tournament", {
    tournament_name: Sequelize.STRING,
    }, {
  // disable the modification of tablenames; By default, sequelize will automatically
  // transform all passed model names (first parameter of define) into plural.
  // if you don't want that, set the following
  freezeTableName: true
});

// Syncs with DB
Tournament.sync();

// Makes the Character Model available for other files (will also create a table)
module.exports = Tournament;