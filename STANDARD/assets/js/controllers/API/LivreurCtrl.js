'use strict'

app.controller('LivreurCtrl', ["$scope", "$http", "SweetAlert", "user", "$window", "$cookies", function($scope, $http, SweetAlert, user, $window, $cookies) {

    // Get Selected Option from Select
    $scope.changed = function(item) {

        $scope.liv = item.NOM_PERSONNEL;

    }

    // Le Nom du livreur Pour le filtrage du livraion transmis 

    var nomLivreur = user.getName();


    $scope.getCommandesConfirme = function(index) {

        $http.get(
            "http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Service Livraison/getIndexL.php").success(function(data) {
            $scope.cmdcf = data;

        })

    }

    $scope.getCommandesConfirmeSP = function(index) {

        $http.get(
            "http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Service Livraison/getIndexLSP.php").success(function(data) {
            $scope.cmdcfSP = data;

        })

    }

    $scope.getNomLivreur = function() {

        $http.get("http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Service Livraison/getNomLivreur.php")
            .success(function(data) {
                $scope.livreurs = data;

            });
        // $scope.liv = $scope.livreurs[0];

    };



    // DEBUT : CONFIRMATION DU CHOIX DU LIVREUR DE COLLECTE 

    $scope.postLivreurCollecte = function(index) {
        $http.get(
            "http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Service Livraison/getIndexL.php").success(function(data) {
            $scope.cmds = data;
            $scope.cmdid = data[index].ID_COMMANDE;
            // alert($scope.cmdid);
        })
        SweetAlert.swal({

            title: "La commande sera affectée à " + $scope.liv,
            text: "Voulez-vous confirmer la commande ?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Oui",
            cancelButtonText: "Non!",
            closeOnConfirm: false,
            closeOnCancel: false
        }, function(isConfirm) {
            if (isConfirm) {
                $http.post("http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Service Livraison/postLivreurCollecte.php", {
                        'id': $scope.cmdid,
                        'LIVREUR_COLLECTE': $scope.liv,

                    })
                    .success(function(data) {
                        // alert(data[index].DD_COMMANDE);
                        //$scope.show_cmdaprep();
                        setTimeout(function() {

                         window.location.reload();

                        }, 500);
                    });
                
                // SweetAlert.swal({
                //     title: "Confirmée!",
                //     text: "Votre Commande a été confirmée.",
                //     type: "success",
                //     confirmButtonColor: "#007AFF"

                // });
            } else {
                SweetAlert.swal({
                    title: "Annulée!",
                    text: "",
                    type: "error",
                    confirmButtonColor: "#007AFF"
                });
            }
        });
    };
    // FIN : CONFIRMATION DU CHOIX DU LIVREUR DE COLLECTE 


    // DEBUT : CONFIRMATION DU CHOIX DU LVREUR DE LIVRAISON 

    $scope.postLivreurLivraison = function(index) {
        $http.get(
            "http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Service Livraison/getIndexLSP.php").success(function(data) {
            $scope.cmds = data;
            $scope.cmdid = data[index].ID_COMMANDE;
            // alert($scope.cmdid);
        })
        SweetAlert.swal({

            title: "Voulez Vous Vraiment Confirmer La Commande ?",
            text: "La commande sera prochainement confirmée!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Oui, Confirmez!",
            cancelButtonText: "Non, Annulez!",
            closeOnConfirm: false,
            closeOnCancel: false
        }, function(isConfirm) {
            if (isConfirm) {
                $http.post("http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Service Livraison/postLivreurLivraison.php", {
                        'id': $scope.cmdid,
                        'LIVREUR_LIVRAISON': $scope.liv,

                    })
                    .success(function(data) {
                        // alert(data[index].DD_COMMANDE);
                        //$scope.show_cmdaprep();
                    });

                setTimeout(function() {

                    window.location.reload();

                }, 500);
                // SweetAlert.swal({
                //     title: "Confirmée!",
                //     text: "Votre Commande a été confirmée.",
                //     type: "success",
                //     confirmButtonColor: "#007AFF"

                // });
            } else {
                SweetAlert.swal({
                    title: "Annulée!",
                    text: "Pas de Changement 🙂",
                    type: "error",
                    confirmButtonColor: "#007AFF"
                });
            }
        });
    };

    // FIN : CONFIRMATION DU CHOIX DU LIVREUR DE LIVRAISON 




    $scope.toCollecte = function(index) {
        // alert(nomLivreur);
        $http.post(
            "http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Livreur/getCollecte.php", {
                'NOM_LIVREUR': nomLivreur
            }).success(function(data) {
            $scope.toC = data;

        })
    }

    //toDeliver For Livreur 

    $scope.toDeliver = function(index) {
        $http.post(
            "http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Livreur/getDeliver.php", {
                'NOM_LIVREUR': nomLivreur
            }).success(function(data) {
            $scope.toD = data;

        })
    }

    // DEBUT : REDIRECTION VERS LE PANIER 
    $scope.RedirectL = function(index) {

            $scope.cart = [];
            $cookies.putObject('cart', $scope.cart);

            $http.post(
                "http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Livreur/getCollecte.php", {
                    'NOM_LIVREUR': nomLivreur
                }).success(function(data) {
                $scope.toC = data;
                // alert(data[index].ID_COMMANDE);
                user.cmdTemp(data[index].ID_COMMANDE);
                // alert("COMMANDE TEMP " + user.getCmdTemp());
                $window.location.href = "#/app/Panier";

            })


            // 
        }
        // FIN : REDIRECTION VERS LE PANIEr 


    $scope.ConfirmationD = function(index) {


        $http.post(
            "http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Livreur/getDeliver.php", {
                'NOM_LIVREUR': nomLivreur
            }).success(function(data) {
            $scope.getD = data;
            // alert(data);

            $scope.IDD = data[index].ID_COMMANDE;
            // alert(data);
            // alert(data[index].ID_COMMANDE);


        })
        SweetAlert.swal({

            title: "Voulez Vous Vraiment Confirmer La Commande ?",
            text: "La commande sera prochainement confirmée!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Oui, Confirmez!",
            cancelButtonText: "Non, Annulez!",
            closeOnConfirm: false,
            closeOnCancel: false
        }, function(isConfirm) {
            if (isConfirm) {
                $http.post("http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Livreur/UpdateFinal.php", {
                        'id': $scope.IDD
                    })
                    .success(function(data) {
                        //$scope.reload();
                        //$scope.show_cmdaprep();
                    });

                setTimeout(function() {

                    window.location.reload();

                }, 500);
                // SweetAlert.swal({
                //     title: "Confirmée!",
                //     text: "Votre Commande a été confirmée.",
                //     type: "success",
                //     confirmButtonColor: "#007AFF"

                // });
            } else {
                SweetAlert.swal({
                    title: "Annulée!",
                    text: "Pas de Changement 🙂",
                    type: "error",
                    confirmButtonColor: "#007AFF"
                });
            }
        });
    };


}]);