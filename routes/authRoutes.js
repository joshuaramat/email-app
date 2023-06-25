const passport = require('passport');

// route handler for google auth
module.exports = (app) => {
  app.get('/auth/google', 
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  )

  app.get('/auth/google/callback',
    passport.authenticate('google')
  )
}
