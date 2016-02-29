app.service('LocalStorageService', localStorage);

function localStorage(){
  function set(key, value) {
    localStorage.setItem(key, value);
  }

  return {
    set: set
  };
}
