var myApp = angular.module('myApp', []);

myApp.controller('clientsCtrlr', ['$scope','$http', function ($scope, $http) {
	console.log('Hi from the controller!');

	var refresh = function() {
		$http.get('/clients').then(function (response) {
			console.log("controller got the data it requested");
			$scope.clients = response.data;
//			console.log($scope.clients[1]);
			$scope.formModel = {};
		});
	};

	refresh();

	$scope.register = function () {
		console.log($scope.formModel);
		$http.post('/client', $scope.formModel).then(function(response) {
			console.log(response.data);
			refresh();
		});
	};

	$scope.remove = function(id) {
		console.log(id);
		$http.delete('/client/'+ id).then(function(response) {
			refresh();
		});
	};

	$scope.edit = function(id) {
		console.log("controller edit id:" + id);
		$http.get('/client/'+ id).then(function(response) {
		console.log("controller http.get:" + response.data);
			$scope.formModel = response.data;
		});
	};

	$scope.update = function() {
		console.log("controller update: id: " + $scope.formModel._id + ", firstName: " + $scope.formModel.firstName);
		$http.put('/client/' + $scope.formModel._id, $scope.formModel).then(function(response) {
			console.log("controller http.put id: " + $scope.formModel._id + ",\n"+
		"userName: " + $scope.formModel.userName);
			refresh();
		});
	};

	$scope.deselect = function() {
		$scope.formModel={};
	};


}]);