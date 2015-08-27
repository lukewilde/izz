var Rss = require('rss')
  , properties = require('../../properties')
  , _ = require('lodash')
  , denormalise = require('../content-denormaliser')
  , liveFilter = require('../util/is-live-filter')

module.exports = function(articleService) {

  var options =
      { title: properties.title
      , description: properties.description
      , site_url: properties.siteUrl
      , feed_url: properties.siteUrl + '/rss'
      , image_url: properties.siteUrl + '/icon.png'
      , author: 'Luke Wilde'
      , copyright: '2014 Luke Wilde'
      , language: 'en'
      , ttl: '60'
      }
    , feed = new Rss(options)
    , addToFeed = function (article) {
        feed.item(
          { title: article.headline
          , description: article.body
          , url: article.fullUrl
          , date: article.published.raw
          }
        )
      }

  return function(req, res, next) {
    articleService.find(liveFilter, function (error, articles) {
      if (error) return next(error)

      _.each(denormalise(articles), addToFeed)

      res.set('Content-Type', 'text/xml')
      res.send(feed.xml())
    })
  }
}
