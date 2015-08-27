var express = require('express')
  , contentDenormaliser = require('../content-denormaliser')
  , _ = require('lodash')
  , url = require('url')
  , liveFilter = require('../util/is-live-filter')
  , async = require('async')

module.exports = function(serviceLocator) {

  var portfolioRouter = express.Router()
    , portfolioService = serviceLocator.portfolio

  portfolioRouter.get('/', function(req, res, next) {

    var gamesQuery = _.extend({ type: 'game' }, liveFilter)
      , websiteQuery = _.extend({ type: 'website' }, liveFilter)
      , options = { limit: 6, sort: [['published', 'desc']] }

    async.parallel(
      { games: function (callback) {
          portfolioService.find(gamesQuery, options, callback)
        }
      , websites: function(callback) {
          portfolioService.find(websiteQuery, options, callback)
        }
      }
    , function(error, results) {
        if (error) return next(error)

        res.render('front-end/portfolio/index',
          { games: contentDenormaliser(results.games)
          , websites: contentDenormaliser(results.websites)
          }
        )
      }

    )

  })

  portfolioRouter.get('/:slug', function(req, res, next) {

    var query = { slug: req.params.slug }
        , parts = url.parse(req.url, true)

    if (typeof parts.query.preview === 'undefined') {
      query = _.extend({}, liveFilter, query)
    }

    portfolioService.find(query, function(error, items) {
      if (error) return next(error)
      if (items.length < 1) {
        return next()
      }
      res.render('front-end/portfolio/view', { item: contentDenormaliser(items.shift()) })
    })
  })

  return portfolioRouter
}
