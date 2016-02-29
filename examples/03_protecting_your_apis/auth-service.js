app.service('AuthService', auth);

function auth($http){
  function login(username, password){
    return $http({
      method: 'POST',
      url: '/api/v1/users/login',
      data: {
        username: username,
        password: password
      }
    });
  }

  return {
    login: login
  };
}
