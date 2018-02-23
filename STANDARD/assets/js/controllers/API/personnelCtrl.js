'use strict';
//var app = angular.module("myapp");
app.controller("personnelCtrl", function($scope, $http, $log, $aside, SweetAlert, $uibModal, $rootScope, $cookies, $filter, $state, $window, $timeout, ngTableParams) {
    // List of Personnel
    $scope.personnels = [];

    $scope.listPersonnels = function() {
        $http.get('http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Admin/Personnel/script/list.php', {})
            .then(function success(e) {
                $scope.personnels = e.data.personnels;
            }, function error(e) {

            });
    };
    $scope.addPersonnel = function() {
        $http.post('http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Admin/Personnel/script/create.php', {
                pesonnel: $scope.personnel
            })
            .then(function success(e) {

                $scope.errors = [];

                $scope.personnels.push(e.data.personnel);

                // var modal_element = angular.element('#add_new_task_modal');
                // modal_element.modal('hide');

            }, function error(e) {
                $scope.errors = e.data.errors;
            });
    };
    $scope.ajouterPersonnel = function(position) {
        $aside.open({
            templateUrl: 'ajouterPersonnel.html',
            placement: position,
            size: 'sm',
            backdrop: true,
            scope: $scope,
            controller: function($scope, $uibModalInstance) {

                $scope.ok = function(e) {
                    // alert($scope.personnel.NOM_PERSONNEL);
                    var request = $http({
                        method: "post",
                        url: "http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Admin/Personnel/script/create.php",
                        data: {
                            personnel: $scope.personnel
                                // ,first_name: $scope.first_name,
                                // last_name: $scope.last_name,
                                // dept_name: $scope.dept_name,
                        },
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                    }).then(function(response) {
                        // code to execute in case of success
                        $scope.errors = [];
                        $scope.personnels.push($scope.personnel);
                        // console.log(response.data);
                    }, function(response) {
                        // code to execute in case of error
                        console.log("Erreuur!");
                    });

                    $uibModalInstance.close();
                    e.stopPropagation();
                };
                $scope.cancel = function(e) {
                    $uibModalInstance.dismiss();
                    e.stopPropagation();
                };
            }
        });
    };
    // open edit Personnel details popup
    $scope.edit = function(position, index) {
        // alert("");
        // $scope.personnel_details = $scope.personnels[index];
        // var result = document.getElementById('#modal_update_task');
        // var modal_element = angular.element(result);
        // modal_element.modal('show');
        // $('modal_update_task').modal('show');
        // $scope.open = function (size) {
        $aside.open({
            templateUrl: 'editPersonnel.html',
            placement: position,
            size: 'sm',
            backdrop: true,
            scope: $scope,
            controller: function($scope, $uibModalInstance) {
                $scope.personnel_details = $scope.personnels[index];
                // alert($scope.personnels[index].NOM_PERSONNEL);
                $scope.ok = function(e) {
                    $http.post('http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Admin/Personnel/script/update.php', {
                        personnel: $scope.personnel_details
                    }).success(function(data) {
                        alert(data);
                        //$scope.show_cmdaprep();
                    });
                    $uibModalInstance.close();
                    e.stopPropagation();
                };
                $scope.cancel = function(e) {
                    $uibModalInstance.dismiss();
                    e.stopPropagation();
                };
            }
        });


        // };
    };
    // update the task
    $scope.updatePersonnel = function() {
        $http.post('http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Admin/Personnel/script/update.php', {
                personnel: $scope.personnel_details
            })
            .then(function success(e) {

                $scope.errors = [];

                // var modal_element = angular.element('#modal_update_task');
                // modal_element.modal('hide');
                alert(data);
            }, function error(e) {
                $scope.errors = e.data.errors;
                alert(data);
            });
    };
    // delete the task
    $scope.delete = function(index) {

        SweetAlert.swal({

            title: "Voulez Vous Vraiment Supprimer Cette Personne ?",
            text: "La Personne sera prochainement supprimée!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Oui, Supprimez!",
            cancelButtonText: "Non, Annulez!",
            closeOnConfirm: false,
            closeOnCancel: false
        }, function(isConfirm) {
            if (isConfirm) {
                $http.post('http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Admin/Personnel/script/delete.php', {
                    personnel: $scope.personnels[index]
                })
                $scope.errors = [];
                $scope.personnels.splice(index, 1);
                SweetAlert.swal({
                    title: "supprimée!",
                    text: "Votre Commande a été supprimée.",
                    type: "success",
                    confirmButtonColor: "#007AFF"

                });
            } else {
                // $scope.errors = e.data.errors;
                SweetAlert.swal({
                    title: "Annulée!",
                    text: "Pas de Changement :)",
                    type: "error",
                    confirmButtonColor: "#007AFF"
                });
            }
        });
        // var conf = confirm("Do you really want to delete the task?");

        // if (conf == true) {
        //     $http.post('http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Admin/Personnel/script/delete.php', {
        //         personnel: $scope.personnels[index]
        //     })
        //         .then(function success(e) {

        //             $scope.errors = [];
        //             // alert(index);
        //             $scope.personnels.splice(index, 1);

        //         }, function error(e) {
        //             $scope.errors = e.data.errors;
        //         });
        // }
    };
    $scope.listPersonnels();
});