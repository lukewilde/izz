var schemata = require('schemata')
  , validity = require('validity')
  , createUniqueValidator = require('validity-unique-property')

module.exports = function(db) {

  var articleCollection = db.collection('article')
    , uniqueSlugCheck = function(object, callback) {
        articleCollection.findOne({ slug: object.slug, _id: { $ne: object._id }}, function(error, article) {
          if (error) return callback(error)

          // Object ID's come back as objects.
          if (article && article._id) article._id = article._id.toString()

          callback(error, article)
        })
      }

  var schema = schemata(
    { headline:
      { name: 'Title'
      , validators:
        { all: [validity.required]
        }
      }
    , subtitle:
      { name: 'Sub Title'
      }
    , slug:
      { name: 'Slug'
      , validators:
        { all: [validity.required, createUniqueValidator(uniqueSlugCheck)]
        }
      }
    , description:
      { name: 'Description'
      }
    , body:
      { name: 'Body'
      , validators:
        { all: [validity.required]
        }
      }
    , scripts:
      { name: 'Scripts'
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
