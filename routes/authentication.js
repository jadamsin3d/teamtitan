var db = require("../model");
var passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;
var session=require('express-session')




module.exports = function (app) {
  
  app.post("/api/login", passport.authenticate("local", 
                           { failureRedirect: '/loginForm',
                           successRedirect:'/Tournament.html' }));

  app.get("/api/signout", function (req, res) {
    req.logout();
    res.redirect("/");
  });
  
 app.get("/api/registrationForm", function (req, res) {      
      res.redirect("/registrationForm");
 });
 app.get('/Tournament.html',authenticationMiddleware(),function(req,res,){
   res.render('Tournament')
 })
                  
//registration
  app.post("/api/postuser", function (req, res) {
    console.log("==============================")
    console.log("Attempting to create");
    console.log(req.body)
    db.userTable.create({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email
    })
      .then(function () {
        console.log("complete");
       
        res.redirect("/Tournament.html");
      }).catch(function (err) {
        console.log(err);
        res.json(err);
      });
  });

  
  function authenticationMiddleware () {  
    return (req, res, next) => {
      console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);
  
        if (req.isAuthenticated()) return next();
        res.redirect('/login')
    }
  }
passport.use(new LocalStrategy(
	// Our user will sign in using an email, rather than a "username"
	// {
	//     usernameField: "email"
	// },
	function (email, password, done) {
		console.log("Validating User", email, password);
		// When a user tries to sign in this code runs
		db.userTable.findOne({
			where: {
				email: email
			}
		}).then(function (dbUser) {
			if (!dbUser) {
				return done(null, false, {					
				});				
			}
			//If there is a user with the given email, but the password the user gives us is incorrect
			else if (!dbUser.validPassword(password)) {
				return done(null, false, {
				//	message: "Incorrect password."
				});
			}
			// If none of the above, return the user
			console.log(dbUser)
			return done(null, dbUser);
		});
	}
));

passport.serializeUser(function (dbUser, cb) {
	cb(null, dbUser);
});

passport.deserializeUser(function (dbUser, cb) {
	cb(null,dbUser);
});
  // app.get("/api/user_data", function (req, res) {
  //   if (!req.authTable) {
  //     res.json({});
  //   }
  //   else {
  //     res.json({
  //       email: req.authTable.email,
  //       id: req.authTable.id
  //     });
  //   }
  // });
  
  
};