var app = angular.module('pirates', ['ngRoute']);

app.config(function ($routeProvider){
  $routeProvider
  .when('/', {
    templateUrl: 'index.html',
    controller: 'piratesController'
  })
})
