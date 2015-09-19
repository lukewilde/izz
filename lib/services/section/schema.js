var schemata = require('schemata')
  , validity = require('validity')
  , createUniqueValidator = require('validity-unique-property')

module.exports = function(db) {

  var portfolioCollection = db.collection('section')
    , uniqueSlugCheck = function(object, callback) {
        portfolioCollection.findOne({ slug: object.slug, _id: { $ne: object._id }}, function(error, item) {
          if (error) return callback(error)

          // Object ID's come back as objects.
          if (item && item._id) item._id = item._id.toString()

          callback(error, item)
        })
      }

  var schema = schemata(
    { title:
      { name: 'Title'
      , validators:
        { all: [validity.required]
        }
      }
    , slug:
      { name: 'Slug'
      , validators:
        { all: [validity.required, createUniqueValidator(uniqueSlugCheck)]
        }
      }
    , description:
      { name: 'Description'
      , validators:
        { all: [validity.required]
        }
      }

    // Meta data
    , published:
      { name: 'Date Published'
      , type: Date
      , defaultValue: new Date().toISOString()
      }
    , created:
      { name: 'Date Created'
      , type: Date
      , defaultValue: new Date().toISOString()
      }
    , isVisible:
      { type: Boolean
      , defaultValue: false
      }
    , _id: {}
    }
  )

  return schema
}
