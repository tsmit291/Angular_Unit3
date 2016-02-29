app.controller('LoginController', login);

function($scope, AuthService, LocalStorageService, $location){
  $scope.login = function(form){
    AuthService.login(form.username, form.password)
      .then(userLoggedIn);
  }

  function userLoggedIn(result){
    LocalStorageService.set('token', result.token);

    $location.path('/dashboard');
  }
}
