var db = require("../models");
var path = require("path");
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {

  app.get("/", function(req, res) {
    if (req.user) {
      res.redirect("/dashboard");
    }
    res.sendFile(path.join(__dirname, "../views/auth.handlebars"));
  });

  app.get("/index", function(req, res) {
    if (req.user) {
      res.redirect("/dashboard");
    }
    res.sendFile(path.join(__dirname, "../public/index.handlebars"));
  });

  app.get("/dashboard", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../views/dashboard.handlebars"));
  });
};

