var environment = process.env.NODE_ENV || 'development';
var config = require('../knexfile')[environment]
module.exports = require('knex')(config);


// let's string up the database
// environment variable that detects development or production
// config variable that retrieves config settings
// export connection
