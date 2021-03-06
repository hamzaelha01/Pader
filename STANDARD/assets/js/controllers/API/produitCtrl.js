'use strict';
//var app = angular.module("myapp");
app.controller("produitCtrl", function($scope, $http, $log, $aside, SweetAlert, $uibModal, $rootScope, $cookies, $filter, $state, $window, $timeout, ngTableParams) {
    // List of Personnel
    $scope.produits = [];

    $scope.changed = function(item) {

        $scope.catg = item.DESGINATION_CAT;
        $scope.catgid = item.ID_CATEGORIE;

    }

    $scope.GetCatg = function() {
        $http.get("http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Admin/Produit/script/getcateg.php")
            .success(function(data) {
                $scope.cated = data;
            })
    }

    $scope.loadCategorie = function() {
        $http.get("http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Admin/Produit/script/categories.php")
            .success(function(data) {
                $scope.categories = data;
                // console.log(data); 
            })
    };
    $scope.ajouterCategorie = function(position) {
        $aside.open({
            templateUrl: 'ajouterCategorie.html',
            placement: position,
            size: 'sm',
            backdrop: true,
            scope: $scope,
            controller: function($scope, $uibModalInstance) {

                $scope.ok = function(e) {
                    // console.log($scope.categorie);
                    // console.log($scope.produits);
                    // console.log($scope.produit.categorie);
                    var request = $http({
                        method: "post",
                        url: "http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Admin/Produit/script/addCategory.php",
                        data: {
                            categorie: $scope.categorie
                                // ,first_name: $scope.first_name,
                                // last_name: $scope.last_name,
                                // dept_name: $scope.dept_name,
                        },
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                    }).then(function(response) {
                        // code to execute in case of success
                        // $scope.errors = [];
                        // $scope.categories.push($scope.categorie);
                        console.log(response);
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
    // $scope.testData = function () {
    //     //    alert("Hamdoulilah");
    //        $http.get('http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Admin/Produit/script/testData.php', {})
    //            .then(function success(e) {
    //             //    $scope.produits = e.data.produits;
    //                console.log(e);
    //             //    console.log(e.data.produits.categorie);
    //            }, function error(e) {
    //                 console.log(e);
    //            });
    //    };
    $scope.listProduits = function() {
        //    alert("Hamdoulilah");
        $http.get('http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Admin/Produit/script/list.php', {})
            .then(function success(e) {
                $scope.produits = e.data.produits;
                //    $scope.produits.categorie = e.data.produits.categorie;
                //    $scope.categoriex = e.data.produits.DESGINATION_CAT; 
                //    console.log(e.data.produits[1].CATEGORIE);

            }, function error(e) {
                console.log(e);
            });
    };
    $scope.addPersonnel = function() {
        $http.post('http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Admin/Produit/script/create.php', {
                produit: $scope.produit
            })
            .then(function success(e) {

                $scope.errors = [];

                $scope.produits.push(e.data.produit);

                // var modal_element = angular.element('#add_new_task_modal');
                // modal_element.modal('hide');

            }, function error(e) {
                $scope.errors = e.data.errors;
            });
    };
    $scope.ajouterProduit = function(position) {

        $aside.open({
            templateUrl: 'ajouterProduit.html',
            placement: position,
            size: 'sm',
            backdrop: true,
            scope: $scope,
            controller: function($scope, $uibModalInstance) {

                $scope.ok = function(e) {
                    // console.log($scope.produit);
                    // // console.log($scope.produits);
                    // // console.log($scope.produit.categorie);
                    // var request = $http({
                    //     method: "post",
                    //     url: "http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Admin/Produit/script/create.php",
                    //     data: {
                    //         produit: $scope.produit
                    //             // ,first_name: $scope.first_name,
                    //             // last_name: $scope.last_name,
                    //             // dept_name: $scope.dept_name,
                    //     },
                    //     headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                    // }).then(function(response) {
                    //     // code to execute in case of success
                    //     $scope.errors = [];
                    //     $scope.produits.push($scope.produit);
                    //     // console.log(response.data);
                    // }, function(response) {
                    //     // code to execute in case of error
                    //     console.log("Erreuur!");
                    // });

                    // Create a new product : 

                    alert("Designation Product : " + $scope.DESIGNATION);
                    alert(" Id Categore : " + $scope.catgid);
                    alert(" Prix : " + $scope.prix);
                    $http.post("http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Admin/Produit/script/create.php", {
                            'Designation_Product': $scope.DESIGNATION,
                            'ID_Categorie': $scope.catgid,
                            'Prix': $scope.prix

                        })
                        .success(function(data) {
                            alert("good to go!");
                        });


                    $uibModalInstance.close();
                    // e.stopPropagation();
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
        // alert(index);
        $aside.open({
            templateUrl: 'editProduit.html',
            placement: position,
            size: 'sm',
            backdrop: true,
            scope: $scope,
            controller: function($scope, $uibModalInstance) {
                $scope.produit_details = $scope.produits[index];
                alert($scope.produit_details.ID_PRODUIT);
                $scope.ok = function(e) {


                    $scope.id = $scope.produit_details.ID_PRODUIT;
                    alert($scope.id);
                    // var request = $http({
                    //     method: "post",
                    //     url: "http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Admin/Produit/script/update.php",
                    //     data: {
                    //         produit: $scope.produits[index]
                    //     },
                    //     headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                    // }).then(function(response) {
                    //     // code to execute in case of success
                    //     console.log(response);
                    //     // console.log(response.data);
                    // }, function(response) {
                    //     // code to execute in case of error
                    //     console.log("Erreuur!");
                    // });

                    // alert("Designation Product : " + $scope.EditDESIGNATION);



                    $http.post("http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Admin/Produit/script/update.php", {
                            'IDPROD': $scope.id,
                            'Designation_Product': $scope.EditDESIGNATION,
                            'ID_Categorie': $scope.catgid,
                            'Prix': $scope.EditPRIX

                        })
                        .success(function(data) {
                            // alert("good to go!");
                        });



                    // $http.post('http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Admin/Produit/script/update.php', {
                    //     produit: $scope.produit_details
                    // }).success(function(data) {
                    //     console.log(data);

                    //     });
                    // console.log($scope.produit_details);
                    $uibModalInstance.close();
                    // e.stopPropagation();
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
    // $scope.updateProduit = function () {
    //     $http.post('http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Admin/Produit/script/update.php', {
    //         produit: $scope.produit_details
    //     })
    //         .then(function success(e) {

    //             $scope.errors = [];

    //             // var modal_element = angular.element('#modal_update_task');
    //             // modal_element.modal('hide');
    //             alert(data);
    //         }, function error(e) {
    //             $scope.errors = e.data.errors;
    //             alert(data);
    //         });
    // };
    // delete the task
    $scope.delete = function(index) {

        SweetAlert.swal({

            title: "Voulez Vous Vraiment Supprimer Ce Produit ?",
            text: "Ce Produit sera prochainement supprimé!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Oui, Supprimez!",
            cancelButtonText: "Non, Annulez!",
            closeOnConfirm: false,
            closeOnCancel: false
        }, function(isConfirm) {
            if (isConfirm) {
                $http.post('http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Admin/Produit/script/delete.php', {
                    produit: $scope.produits[index]
                })
                $scope.errors = [];
                $scope.produits.splice(index, 1);
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
        //     $http.post('http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/views/MyUpdate/personnel/script/delete.php', {
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
    $scope.listProduits();
    // $scope.loadCategorie();


    //    $scope.testData();
});