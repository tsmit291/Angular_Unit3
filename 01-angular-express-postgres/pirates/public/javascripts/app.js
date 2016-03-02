var app = angular.module('pirates', ['ngRoute']);

app.config(function ($routeProvider){
  $routeProvider
  .when('/', {
    templateUrl: 'views/pirates.html',
    controller: 'piratesController'
  })
})
