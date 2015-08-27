var async = require('async')
  , _ = require('lodash')
  , makePortfolioController = require('./controllers/portfolio-controller')
  , sessionRouter = require('./routes/session')
  , contentDenormaliser = require('./content-denormaliser')
  , liveFilter = require('./util/is-live-filter')
  , makeAdminRouter = require('./routes/admin')

function makeRoutes (app, serviceLocator) {

  app.get('/', function (req, res, next) {

    async.parallel(
      { portfolioItem: function(callback) {
          var portfolioFilter = _.extend({ isFeatured: true }, liveFilter)
            , queryOptions = { limit: 1, sort: [['published', 'desc']] }

          serviceLocator.portfolio.find(portfolioFilter, queryOptions, callback)
        }
      }
    , function (error, results) {
        if (error) return next(error)

        res.render('front-end/index',
          { portfolioItem: contentDenormaliser(results.portfolioItem[0])
          }
        )
      }
    )

  })

  app.get('/login', sessionRouter.login.get)
  app.post('/login', sessionRouter.login.post)
  app.get('/logout', sessionRouter.logout)

  app.use('/admin', makeAdminRouter(serviceLocator))
  app.use('/portfolio', makePortfolioController(serviceLocator))

  app.get('/cv', function(req, res) {
    res.redirect('/downloads/isabelle-smillie-cv.pdf')
  })

  // Error controllers.
  app.use(function (req, res) {
    res.render('error/404', { status: 404, url: req.url })
  })

  app.use(function (error, req, res) {
    res.render('500',
      { status: error.status || 500
      , error: error
    })
  })
}

module.exports = makeRoutes
