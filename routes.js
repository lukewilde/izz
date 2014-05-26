var indexView = require('./views/index')
  , galleryView = require('./views/gallery')
  , galleryItemView = require('./views/gallery-item')

module.exports = makeRoutes

function makeRoutes(app, imageCache, debug) {

  app.get('/', function (req, res) {
    indexView(req, res)
  })

  app.get('/gallery/(:type)/(:image)', function (req, res) {
    return galleryItemView(req, res, imageCache, debug)
  })

  app.get('/gallery/(:type)', function (req, res) {
    return galleryView(req, res, debug)
  })

  app.get('/gallery', function (req, res) {
    res.redirect('/gallery/portrait');
  })

  app.get('/about', function (req, res) {
    res.render('about')
  })

  app.get('/bliink', function (req, res) {
    res.render('bliink')
  })

  app.use(function(req, res, next){
    res.render('404')
  });
}
