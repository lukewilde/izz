var express = require('express')
  , ensureAuthenticated = require('../ensure-authenticated')
  , makeCrudController = require('../controllers/crud-controller')

module.exports = function(serviceLocator) {

  var admin = express.Router()

  // All admin routes require authentication.
  admin.use(ensureAuthenticated)

  admin.get('/', function(req, res) {
    res.render('admin/index')
  })

  admin.use('/section', makeCrudController(serviceLocator.section))

  return admin
}
