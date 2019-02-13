var db = require("../models");

module.exports = function(app) {
  // find all users
  app.get("/api/postuser", function(req, res) {
    db.authTable.findAll({}).then(function(results) {
      res.json(results);
    });
  });

  app.post("/api/postuser", function(req, res) {
    // post a user
    console.log("Attempting to create");
    db.authTable.create({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email
    })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });



  // // Create a new example
  // app.post("/api/examples", function(req, res) {
  //   db.Example.create(req.body).then(function(dbExample) {
  //     res.json(dbExample);
  //   });
  // });

  // Delete an example by id
  // app.delete("/api/examples/:id", function(req, res) {
  //   db.Example.destroy({ where: { id: req.params.id } }).then(function(
  //     dbExample
  //   ) {
  //     res.json(dbExample);
  //   });
  // });  
};