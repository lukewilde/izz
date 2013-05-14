var connect = require('connect')
  , gzippo = require('gzippo')
  , express = require('express')
  , stylus = require('stylus')
  , nib = require('nib')
  , app = express()
  , portraitImages = require('./views/images/portrait')
  , lifestyleImages =require('./views/images/lifestyle')

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib())
}

app.set('views', __dirname + '/views/templates')
app.set('view engine', 'jade')
app.use(express.logger('dev'))
app.use(stylus.middleware(
  { src: __dirname + '/public/'
  , compile: compile
  }
))

app.use(express.static(__dirname + '/public'))

app.get('/', function (req, res) {
  var image = portraitImages[Math.floor(Math.random() * portraitImages.length)]
  res.render('index', {image: image})
})

app.get('/gallery', function (req, res) {

  res.render('gallery',
    { sections:
      [ { name: 'portrait'
        , images: portraitImages
        }
      , { name: 'lifestyle'
        , images: lifestyleImages
        }
      ]
    }
  )
})

app.get('*', function (req, res) {
  res.render(req.path.substring(1, req.path.length))
})

console.log('Server running on http://localhost:3111')

app.listen(3111)