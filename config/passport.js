var db = require('../models');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');
var passport = require('passport');


// Load User model
var User = authTable;

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});
 
//local signup
passport.use('local-signup', new LocalStrategy(
    {
         usernameField: 'email',
         passwordField: 'password',
         passReqToCallback: true
    },

    function(req, email, password, done)
        
        var generateHash = function(password) {
            return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
        };

        user.findOne({where: {email:email}}).then(function(user) {
            if(user) {
                return done(null, false, {message: 'That email is already taken'})
            }

            else {
                var userPassword = generateHash(password);
                var data = 
                    {
                       email: email,
                       password: userPassword,
                       username: req.body.username
                    }
            };

            User.create(data).then(function(newUser, created) {
                if(!newUser) {
                    return done(null, false);
                }

                if(newUser) {
                    return done(null, newUser);
                }
           });
        });
    
    }
));

//local signin
passport.use("local-signin", new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },

    function(req, email, password, done) {
        var User = authTable;

        var isValidPassword = function(userpass, password) {
            return bcrypt.compareSync(password, userpass);
        }

        User.findOne({where: {email: email}}).then(function (user) {
            if(!user) {
                return done(null, false, {message: 'Email does not exist'})
            }
            if(!notValidPassword(user.password, password)) {
                return done(null, false, { message: 'incorrect password.'});
            }

            var userinfo = user.get();

            return done(null, userinfo);
        }).catch(function(err) {
            console.log('Error', err);

            return done(null, false, {message: 'Something went wrong with your Signin'});
        });
    }
));

