var express = require('express')
  , contentDenormaliser = require('../content-denormaliser')
  , _ = require('lodash')
  , url = require('url')
  , liveFilter = require('../util/is-live-filter')

module.exports = function(serviceLocator) {

  var blogRouter = express.Router()
    , articleService = serviceLocator.article

  blogRouter.get('/', function(req, res, next) {
    articleService.find(liveFilter, { sort: [['published', 'desc']] }, function(error, articles) {
      if (error) return next(error)
      res.render('front-end/blog/index', { articles: contentDenormaliser(articles) })
    })
  })

  blogRouter.get('/:slug', function(req, res, next) {

    var query = { slug: req.params.slug }
        , parts = url.parse(req.url, true)

    if (typeof parts.query.preview === 'undefined') {
      query = _.extend({}, liveFilter, query)
    }

    articleService.find(query, function(error, articles) {
      if (error) return next(error)
      if (articles.length < 1) {
        return next()
      }
      res.render('front-end/blog/view', { article: contentDenormaliser(articles.shift()) })
    })
  })

  return blogRouter
}
