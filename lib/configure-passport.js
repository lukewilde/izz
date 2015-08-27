var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , crypto = require('crypto')

module.exports = function(db) {

  passport.use(new LocalStrategy(function(username, password, done) {

    console.log('login attempt: %s', username)

      var userCollection = db.collection('user')
        , hash = crypto.createHash('sha1').update(password).digest('hex')

      userCollection.findOne({ username: username, password: hash }, function(err, user) {
        if (err) {
          return done(err)
        }

        if (!user) {
          return done(null, false, { message: 'No dice.' })
        }

        return done(null, user)
      })
    }
  ))

  passport.serializeUser(function(user, done) {
    done(null, user)
  })

  passport.deserializeUser(function(user, done) {
    done(null, user)
  })
}
