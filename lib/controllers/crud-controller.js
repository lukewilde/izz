var express = require('express')
  , contentDenormaliser = require('../content-denormaliser')

module.exports = function(service) {

  var router = express.Router()

  router.use(function(req, res, next) {
    if (req.body.cancel) return res.redirect('/admin/' + service.name)

    next()
  })

  router.get('/', function(req, res, next) {
    service.find({}, function(error, items) {
      if (error) return next(error)
      res.render('admin/' + service.name + '/list', { items: contentDenormaliser(items) })
    })
  })

  router.get('/new', function(req, res) {
    res.render('admin/' + service.name + '/form', { item: service.schema.makeDefault() })
  })

  router.post('/new', function(req, res) {
    service.create(req.body, function(error, item) {
      if (error) {
        console.log(error)
        return res.render('admin/' + service.name + '/form', { item: item, errors: error.errors })
      }
      saveHandler(req, res)
    })
  })

  router.get('/edit/:slug', function(req, res, next) {
    service.find({slug: req.params.slug}, function(error, items) {
      if (error) return next(error)
      if (items.length < 1) {
        return next()
      }
      res.render('admin/' + service.name + '/form', { item: items.shift() })
    })
  })

  router.get('/delete/:id', function(req, res, next) {
    service.delete(req.params.id, function(error) {
      if (error) return next(error)
      res.redirect('/admin/' + service.name)
    })
  })

  router.post('/edit/:slug', function(req, res) {
    service.update(req.body, {}, function(error, item) {
      if (error) {
        return res.render('admin/' + service.name + '/form', { item: item, errors: error.errors })
      }
      saveHandler(req, res)
    })
  })

  function saveHandler (req, res) {
    console.log(req.body)
    if (req.body.continue) {
      res.redirect(req.originalUrl)
    } else {
      res.redirect('/admin/' + service.name)
    }
  }

  return router
}
