var CrudService = require('crud-service')
  , save = require('save')
  , saveMongodb = require('save-mongodb')
  , createSchema = require('./schema')

module.exports = function(db) {
  var saveOptions = { engine: saveMongodb(db.collection('section'))}
    , sectionService = new CrudService('section', save('section', saveOptions), createSchema(db))

  return sectionService
}
