app.factory('PiratesService', function ($http) {
  return {
    all: function() {
      return $http.get('/api/pirates').then(function (response) {
        return response.data;
      })
    }
  }
})

// spin up the PiratesService service.
// returns an object with an ALL function.
// we are essentially making a get request to our pirates api. this is something that will go in our routes- /api/pirates. then we will make a knex call and we return a response that is a json object.
