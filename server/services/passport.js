const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users'); // fetch the users model class

// turn user model instance into id
passport.serializeUser((user, done) => {
  done(null, user.id); // user.id is the id in the mongo db
});

// turn id into mongoose model instance
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user); // user is the user model instance
    })
})

// create new instance of GoogleStrategy
passport.use(
  new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
  }, (accessToken, refreshToken, profile, done) => {
    // check if user already exists
    User.findOne({ googleId: profile.id })
      .then((existingUser) => {
        // if user exists, return user
        if (existingUser) {
          done(null, existingUser); 
        } else {
          // create new instance of user and save to db
          new User({ googleId: profile.id })
            .save()
            .then(user => done(null, user));
        }
      })
  })
);