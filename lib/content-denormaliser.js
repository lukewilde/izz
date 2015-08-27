var moment = require('moment')
  , _ = require('lodash')
  , properties = require('../properties')

module.exports = function(articles) {

  function isLive (article) {

    if (!article.isVisible) {
      return false
    }

    var now = new Date()
    // console.log(article.published, now)
    return article.published <= now
  }

  function denormaliseArticle(article) {

    if (!article) {
      return false
    }

    var formattedArticle = _.extend({}, article)

    formattedArticle.isLive = isLive(article)

    formattedArticle.created = moment(article.created).format('MMMM Do YYYY')
    formattedArticle.published =
      { raw: article.published
      , long: moment(article.published).format('MMMM Do YYYY')
      , short:
        { month: moment(article.published).format('DD/MMM')
        , year: moment(article.published).format('YYYY')
        }
      }

    formattedArticle.url = '/ding/' + article.slug
    formattedArticle.fullUrl = properties.siteUrl + article.url

    return formattedArticle
  }

  if (_.isArray(articles)) {
    return _.map(articles, denormaliseArticle)
  } else {
    return denormaliseArticle(articles)
  }
}
