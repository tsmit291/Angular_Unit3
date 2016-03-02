app.controller('piratesController', ['$scope', 'PiratesService', function($scope, PiratesService){

PiratesService.all().then(function (pirates){
  console.log("*******pirates*******");
  console.log(pirates);
  $scope.pirates = pirates
})
$scope.message = "argggggh you on the pirate page"

}])
