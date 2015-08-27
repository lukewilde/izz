var schemata = require('schemata')
  , validity = require('validity')
  , createUniqueValidator = require('validity-unique-property')

module.exports = function(db) {

  var portfolioCollection = db.collection('portfolio')
    , uniqueSlugCheck = function(object, callback) {
        portfolioCollection.findOne({ slug: object.slug, _id: { $ne: object._id }}, function(error, item) {
          if (error) return callback(error)

          // Object ID's come back as objects.
          if (item && item._id) item._id = item._id.toString()

          callback(error, item)
        })
      }

  var schema = schemata(
    { headline:
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
    , bigImage:
      { name: 'Big Image'
      }
    , link:
      { name: 'Link'
      }
    , smallImage:
      { name: 'Small Image'
      }
    , tech:
      { name: 'Technologies'
      , validators:
        { all: [validity.required]
        }
      }
    , client:
      { name: 'Client'
      , validators:
        { all: [validity.required]
        }
      }
    , type:
      { name: 'Type'
      , validators:
        { all: [validity.required]
        }
      }
    , body:
      { name: 'Body'
      , validators:
        { all: [validity.required]
        }
      }
    , description:
      { name: 'Description'
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
    , isFeatured:
      { type: Boolean
      , defaultValue: false
      }
    , _id: {}
    }
  )

  return schema
}
