// Code goes here

var myApp = angular.module('myApp', []);

function MyController($scope, $http) {

  $scope.currentPage = 1;
  $scope.pageSize = 20;
  $scope.cart = [];
 
//Contatti

$scope.addContact=function () {
	$scope.entity.Contact.push({Value: ''});
}
	
$scope.removeContact = function(index) {
	if (confirm('Corfema eliminazione?')) {
		$scope.entity.Contact.splice(index, 1);     
	} 	 
}
//Categorie
$scope.addCat=function () {
	$scope.entity.Categories.push({Name: 'Nuova categoria',Alias: 'new',Prices: [{Value: 'Prezzo'}],Entities: []});
};
$scope.removeCat = function(index) {
	if (confirm('Corfema eliminazione?')) {
		$scope.entity.Categories.splice(index, 1);     
	} 	 
}
//Tariffe
$scope.addTr=function (pr) {
	pr.push({Value: 'Prezzo'});
};
$scope.removeTr = function(pr,index) {
	if (confirm('Corfema eliminazione?')) {
		pr.splice(index, 1);     
	} 	 
}

//Entities
$scope.addEt=function (et) {
	et.push({ "Name": "Prodotto", "Items": [], "Prices": [ { "Value": 0 } ]});
};
$scope.removeEt = function(et,index) {
	if (confirm('Corfema eliminazione?')) {
		et.splice(index, 1);     
	} 	 
}
//Items
$scope.addIt=function (it) {
	it.push({Value: ''});
};
$scope.removeIt = function(it,index) {
	if (confirm('Corfema eliminazione?')) {
		it.splice(index, 1);     
	} 	 
}

//Prices
$scope.addPr=function (pr) {
	pr.push({Value: '0'});
};
$scope.removePr = function(pr,index) {
	if (confirm('Corfema eliminazione?')) {
		pr.splice(index, 1);     
	} 	 
}	

//Esporta dati
$scope.getJson=function () {
//var json = JSON.stringify($scope.entity);
var json= angular.toJson($scope.entity, true);
var blob = new Blob([json], {type: "application/json"});
var url  = URL.createObjectURL(blob);

var a =document.getElementById('getJson');
a.download    = $scope.entity.Alias + ".json";
a.href        = url;
a.style.visibility="visible";
}

$scope.hideJson=function () {
var a =document.getElementById('getJson');
a.style.visibility="hidden";	
}

	
 //Carica dati
 $http.get("entity.json")
    .then(function(response) {
        $scope.entity = response.data;
    });
	
$scope.uploadedFile = function(element) {
 $scope.$apply(function($scope) {
 $scope.files = element.files; 
 var reader = new FileReader();
    reader.onload = function(){
      var text = $scope.files;
      //console.log(reader.result);
	  $scope.entity=JSON.parse(reader.result);
	  $scope.$apply();
    };
	reader.readAsText($scope.files[0]);
 });
}

	
  $scope.pageChangeHandler = function(num) {
      
  };
}

function OtherController($scope) {
  $scope.pageChangeHandler = function(num) {
  
  };
}

  var openFile = function(event) {
    var input = event.target;

    var reader = new FileReader();
    reader.onload = function(){
      var text = reader.result;
      console.log(reader.result);
    };
    reader.readAsText(input.files[0]);
  };

myApp.controller('MyController', MyController);
myApp.controller('OtherController', OtherController);
