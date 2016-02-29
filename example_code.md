```js
// app.js

var app = angular.module('pirates', ['ngRoute']);

app.config(function ($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'views/pirates.html',
    controller: 'PiratesController'
  })
})
```
```js
app.controller('PiratesController', ['$scope', function ($scope) {
  $scope.message = "I am a pirate"
}])

```
```html
<!-- index.html -->
<!DOCTYPE html>
<html ng-app='pirates'>
  <head>
    <meta charset="utf-8">
    <title>Pirates Demo</title>
    <link rel="stylesheet" href="/bower_components/bootstrap/dist/css/bootstrap.min.css" media="screen" title="no title" charset="utf-8">
  </head>
  <body ng-controller="PiratesController">
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="#">
            <span class="glyphicon glyphicon-eye-close"></span>
          </a>
        </div>
      </div>
    </nav>
    <div ng-view></div>
    <script type="text/javascript" src="/bower_components/angular/angular.min.js"></script>
    <script type="text/javascript" src="/bower_components/angular-route/angular-route.min.js"></script>
    <script type="text/javascript" src="/javascripts/app.js"></script>
    <script type="text/javascript" src="/javascripts/controllers/pirates_controller.js"></script>
  </body>
</html>
```
