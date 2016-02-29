app.service('BookService', book);

function book($http, LocalStorageService){
  function edit(dataToUpdate){
    var token = LocalStorageService.get('token');

    return $http({
      method: 'PUT',
      url: '/api/v1/books/' + dataToUpdate.id,
      headers: {
        token: token
      },
      data: dataToUpdate
    });
  }

  return {
    edit: edit
  };
}
