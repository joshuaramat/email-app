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
    callbackURL: '/auth/google/callback',
    proxy: true
  }, 
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id })

      if (existingUser) {
        done(null, existingUser); 
      }

      const user = await new User({ googleId: profile.id }).save()
      done(null, user);
    }
  )
);