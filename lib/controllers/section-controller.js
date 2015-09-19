var express = require('express')
  , contentDenormaliser = require('../content-denormaliser')
  , _ = require('lodash')
  , url = require('url')
  , liveFilter = require('../util/is-live-filter')

module.exports = function(serviceLocator) {

  var sectionRouter = express.Router()
    , sectionService = serviceLocator.section

  sectionRouter.get('/', function(req, res, next) {

    sectionService.find({}, function(error, results) {

      if (error) return next(error)

      res.render('front-end/section/index', {})
    })

  })

  sectionRouter.get('/:slug', function(req, res, next) {

    var query = { slug: req.params.slug }
        , parts = url.parse(req.url, true)

    if (typeof parts.query.preview === 'undefined') {
      query = _.extend({}, liveFilter, query)
    }

    sectionService.find(query, function(error, items) {
      if (error) return next(error)
      if (items.length < 1) {
        return next()
      }
      res.render('front-end/section/view', { item: contentDenormaliser(items.shift()) })
    })
  })

  return sectionRouter
}
