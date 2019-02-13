var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    res.render("index");
  });

  // // Load example page and pass in an example by id
  // app.get("/example/:id", function (req, res) {
  //   db.Example.findOne({ where: { id: req.params.id } }).then(function (dbExample) {
  //     res.render("example", {
  //       example: dbExample
  //     });
  //   });
  // });


  app.get("/auth", function (req, res) {
    res.render("auth");
  })

  app.post('/auth', passport.authenticate('local-signup', 
    {successRedirect: '/dashboard',
    failureRedirect: '/auth'
  }));

  app.post('index', passport.authenticate('local-signin', 
    {successRedirect: '/dashboard',
    failureRedirect: '/index'
  }));

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });

  function isLoggedin(req, res, next) {
    if(req.isAuthenticated())
      return next();
    res.redirect('/index');
  }
};

