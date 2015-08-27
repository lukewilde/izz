var CrudService = require('crud-service')
  , save = require('save')
  , saveMongodb = require('save-mongodb')
  , createSchema = require('./schema')

module.exports = function(db) {
  var saveOptions = { engine: saveMongodb(db.collection('portfolio'))}
    , portfolioService = new CrudService('portfolio', save('portfolio', saveOptions), createSchema(db))

  return portfolioService
}
