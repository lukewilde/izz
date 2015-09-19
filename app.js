var express = require('express')
  , stylus = require('stylus')
  , nib = require('nib')
  , passport = require('passport')
  , flash = require('connect-flash')
  , cookieParser = require('cookie-parser')
  , bodyParser = require('body-parser')
  , session = require('express-session')
  , morgan = require('morgan')
  , compress = require('compression')
  , properties = require('./properties')
  , serviceLocator = require('service-locator')()
  , MongoClient = require('mongodb').MongoClient
  , makeRoutes = require('./lib/routes')
  , configurePassport = require('./lib/configure-passport')
  , makePortfolioService = require('./lib/services/portfolio/service')
  , port = 3115
  , app = express()

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .set('compress', true)
    .use(nib())
    .define('url', stylus.url(
      { paths: [__dirname + '/public']
      }
    )
  )
}

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session(
  { secret: '....well good open sourced key you got there mate'
  , saveUninitialized: true
  , resave: true
  }
))
app.use(flash())
app.use(compress())
app.use(passport.initialize())
app.use(passport.session())
app.use(morgan('short'))

app.use(stylus.middleware(
  { src: __dirname + '/public/css/'
  , debug: true
  , compile: compile
  }
))

app.use(express.static(__dirname + '/public'))
app.set('views', __dirname + '/templates')
app.set('view engine', 'jade')

app.locals.properties = properties

MongoClient.connect('mongodb://127.0.0.1:27017/izz', function(err, db) {
  if(err) throw err

  configurePassport(db)

  serviceLocator.register('portfolio', makePortfolioService(db))

  makeRoutes(app, serviceLocator)

  console.log('Server running on http://localhost:' + port)
  app.listen(port)
})
