var passport = require('passport')

module.exports =
  { login:
    { get: function (req, res) {

        var failedAttempt = req.flash('error') >= 1 ? true : false
        res.render('front-end/login', { failedAttempt: failedAttempt })
      }

    , post: passport.authenticate('local',
        { successRedirect: '/admin/'
        , failureRedirect: '/login'
        , failureFlash: true
        }
      )
    }

  , logout: function(req, res) {
      req.logout()
      res.redirect('/')
    }
  }
