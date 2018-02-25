'use strict'
app.controller("majCtrl", function($scope, $http) {
$scope.btnName = "Insert";
    $scope.insert = function() {
    if ($scope.name == null) {
    alert("Enter Your Name");
    } else if ($scope.email == null) {
    alert("Enter Your Email ID");
    } else if ($scope.age == null) {
    alert("Enter Your Age");
    } else {
    $http.post(
    "insert.php", {
    'name': $scope.name,
    'email': $scope.email,
    'age': $scope.age,
    'btnName': $scope.btnName,
    'id': $scope.id
    }
    ).success(function(data) {
    alert(data);
    $scope.name = null;
    $scope.email = null;
    $scope.age = null;
    $scope.btnName = "Insert";
    $scope.show_data();
    });
    }
    }
$scope.show_data = function() {
    $http.get("display.php")
    .success(function(data) {
    $scope.names = data;
    });
    }
    $scope.update_data = function(id, name, email, age) {
    $scope.id = id;
    $scope.name = name;
    $scope.email = email;
    $scope.age = age;
    $scope.btnName = "Update";
}
$scope.delete_data = function(id) {
    if (confirm("Are you sure you want to delete?")) {
    $http.post("delete.php", {
    'id': id
    })
    .success(function(data) {
    alert(data);
    $scope.show_data();
    });
    } else {
    return false;
    }
    }
});

