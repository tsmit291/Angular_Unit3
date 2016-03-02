var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
// you want the environment config'd so require the db knex file to hit the db and its table.

function Pirates(){
  return knex('pirates')
}

// tells you db and table to get things from

/* GET home page. */
router.get('/', function(req, res, next) {
  Pirates().select().then(function (pirates){
    res.json(pirates);
    // this returns a pirates json object
  })
});

module.exports = router;
