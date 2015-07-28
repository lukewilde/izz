var fs = require('fs')
  , _ = require('lodash')

module.exports = function () {

  var types = ['lifestyle', 'portrait', 'travel']

  function getCollection(type, cb) {
    fs.readdir(__dirname + '/../public/images/' + type + '/' + 'big', function(err, files) {

      if (err) {
        cb(err)
      }

      var images = _.map(files, function(file) {

        var image =
            { name: file
            , big: ['/images', type, 'big', file].join('/')
            , small: ['/images', type, 'small', file].join('/')
            , viewUrl: ['/gallery', type, file].join('/')
            }

        return image
      })

      cb(err, images)
    })
  }

  function getRandom(cb) {
    var randomType = types[ Math.floor(Math.random() * types.length) ]

    getCollection(randomType, function (err, collection) {

      if (err) cb(err)

      var randomImage = collection[ Math.floor(Math.random() * collection.length) ]

      cb(null, randomImage)
    })
  }

  function getStock(quantity) {
    var height = 233
      , width = 100
      , largeness = 2
      , bigWidth = 100
      , bigHeight = height * largeness
      , image = {}
      , images = []
      , dummyUrl = 'http://placeholder.clockhosting.com'

    for (var i = 0; i < quantity; i++) {
      width = getRandomFromRange(100, 500)
      bigWidth = width * largeness

      image =
        { name: bigWidth + 'x' + bigHeight
        , src: dummyUrl + '/' + width + 'x' + height
        , big: dummyUrl + '/' + bigWidth + 'x' + bigHeight
        , small: dummyUrl + '/' + width + 'x' + height
        }


      images.push(image)
    }

    return images
  }

  function getRandomFromRange (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  var getImage =
    { getCollection: getCollection
    , getRandom: getRandom
    , getStock: getStock
    , types: types
    }

  return getImage
}
