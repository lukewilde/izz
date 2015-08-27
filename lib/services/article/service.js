var CrudService = require('crud-service')
  , save = require('save')
  , saveMongodb = require('save-mongodb')
  , createSchema = require('./schema')

module.exports = function(db) {
  var saveOptions = { engine: saveMongodb(db.collection('article'))}
    , articleService = new CrudService('article', save('article', saveOptions), createSchema(db))

  return articleService
}
