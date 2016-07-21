// Code goes here

var myApp = angular.module('myApp', []);

function MyController($scope, $http) {

  $scope.currentPage = 1;
  $scope.pageSize = 20;
  $scope.cart = [];
 
 $scope.getTotal = function(){
    var total = 0;
    for(var i = 0; i < $scope.cart.length; i++){
        var product = $scope.cart[i];
        total += (product.Price);
    }
    return total;
}

$scope.addContact=function () {

        $scope.entity.Contact.push({
            Value: ''
        });
    };

$scope.removeContact = function(index) { 
  $scope.entity.Contact.splice(index, 1);     
}	
	


$scope.getJson=function () {
//var json = JSON.stringify($scope.entity);
var json= angular.toJson($scope.entity, true);
var blob = new Blob([json], {type: "application/json"});
var url  = URL.createObjectURL(blob);

var a = document.createElement('a');
a.download    = "locale.json";
a.href        = url;
a.textContent = "Json Pronto per download";

document.getElementById('getJson').appendChild(a);
}
	
 $scope.addItem = function (item,pr) {

        $scope.cart.push({
            Name: item.Name,
            Price:pr.Value
        });
    };

$scope.removeItem = function(item) { 
  var index = $scope.cart.indexOf(item);
  $scope.cart.splice(index, 1);     
}

 $http.get("https://raw.githubusercontent.com/pizzaprezzi/tuonome/gh-pages/entity.json")
    .then(function(response) {
        $scope.entity = response.data;
    });
	
	
  $scope.pageChangeHandler = function(num) {
      
  };
}

function OtherController($scope) {
  $scope.pageChangeHandler = function(num) {
  
  };
}




myApp.controller('MyController', MyController);
myApp.controller('OtherController', OtherController);
