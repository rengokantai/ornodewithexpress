var passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;
var users = require("./data/users.json");
var _ = require("lodash");

passport.use(new LocalStrategy(function(username, password, done){
  var user = _.find(users, u => u.name === username);

  if(!user || user.password !== password){
    done(null, false);  //No error, false means authentication failed
    return;
  }

  done(null, user);
}));

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  var user = _.find(users, u => u.id === id); //The advantage: when you revoke a user's previlege, this will take effect when the user make next request. Otherwise this will take effect when user log out
  done(null, user);
});