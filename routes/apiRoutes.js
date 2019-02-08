var db = require("../models");
var Tournament = require("../models/tournament.js");

module.exports = function(app) {
  // Get all examples
  // app.get("/api/examples", function(req, res) {
  //   db.Example.findAll({}).then(function(dbExamples) {
  //     res.json(dbExamples);
  //   });
  // });

  // Create a new example
  // app.post("/api/tournaments", function(req, res) {
  //   db.Tournament.create(req.body).then(function(data) {
  //     res.json(data);
  //   });
  // });

   // If a user sends data to add a new tournament...
  app.post("/api/new_tournament", function(req, res) {
    // Take the request...
    var tournament = req.body;
    /* new */
    console.log(JSON.parse(req.body));

    // console.log(`Tournament request body: ${tournament}`);
    // Using a RegEx Pattern to remove spaces from tournament.name
    // var tournament_name = tournament.name.replace(/\s+/g, "").toLowerCase();

    // Then add the tournament to the database using sequelize
    Tournament.create({tournament_name: tournament.name}).then(function(data){
      console.log('new tournament added to database using sequelize');
      // res.json(data);
    });

    res.status(204).end();
  });

  // Delete an example by id
  // app.delete("/api/examples/:id", function(req, res) {
  //   db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
  //     res.json(dbExample);
  //   });
  // });
};
