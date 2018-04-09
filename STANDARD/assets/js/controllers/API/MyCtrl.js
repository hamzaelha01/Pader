'use strict';
//var app = angular.module("myapp");
app.controller("MyCtrl", function($scope, $http, $window, $aside, SweetAlert, $cookies, user, $localStorage) {


    //modifier l'horaire 
    var IdUser = user.getID();
    var IDCMD;

    // var cpt;


    $scope.goEpson = function() {

        var builder = new epson.ePOSBuilder();

        builder.addPageBegin();
        builder.addPageArea(100, 50, 200, 100);
        builder.addPagePosition(0, 42);
        builder.addTextLang('en');
        builder.addTextSmooth(true);
        builder.addTextFont(builder.FONT_A);
        builder.addTextSize(4, 4);
        builder.addTextStyle(false, false, true, undefined);
        builder.addText('Hello');
        builder.addPageEnd();
        builder.addCut(builder.CUT_FEED);

        var request = builder.toString();

        // alert(request);

        var address = 'http://192.168.192.168/cgi-bin/epos/service.cgi?devid=local_printer&timeout-10000';
        var epos = new epson.ePOSPrint(address);
        epos.send(request);
        epos.onrecieve = function(res) {
            if (!res.success) {
                alert('not good to go!');
            }
        }
    };

    // Show All records 
    $scope.show_cmdaprep = function() {
        $http.get("http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Service Production/voircmdaprep.php")
            .success(function(data) {
                $scope.names = data;
            });
    }
    $scope.show_cmdalivr = function() {
        $http.get("http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Service Production/voircmdalivr.php")
            .success(function(data) {
                $scope.livrs = data;
            });
    }

    $scope.livrer = function(position, index) {
        $aside.open({
            templateUrl: 'asideContent.html',
            placement: position,
            size: 'sm',
            backdrop: true,
            controller: function($scope, $uibModalInstance) {
                //alert(index);
                //Get Record of this Index
                $http.get(
                        "http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Service Production/voircmdalivr.php").success(function(data) {
                        $scope.cmds = data;
                        $scope.cmdid = data[index].ID_COMMANDE;
                        // alert($scope.cmdid);
                    })
                    // Update Statut of commande
                $scope.ok = function(e) {

                    //alert( $scope.arra(index));
                    $http.post("http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Service Production/confirmeralivr.php", {
                            'id': $scope.cmdid
                        })
                        .success(function(data) {
                            // alert(data);
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
    };

    // Try Printers 

    // $scope.findPrinter = function(name) {
    //     qz.findPrinter("foobar");
    // }

    // function qzDoneFinding() {
    //     if (qz.getPrinter()) {
    //         alert("Printer " + qz.getPrinter() + " found.");
    //     } else {
    //         alert("Printer foobar not found.");
    //     }
    // }



    // Show Sweet Modal
    $scope.fini = function(index, x) {

        // alert(x.QTE);
        // alert(x.ID_COMMANDE);
        // alert(x.ID_CLIENT);
        // alert(x.NOM_CLIENT);

        user.setQteCmd(x.QTE);

        user.setTempRecu(x.ID_COMMANDE);
        user.setTempIDC(x.ID_CLIENT);
        user.setRecuProdCpt(0);

        $window.location.href = '#/app/RecuProd';

        // $http.get(
        //     "http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Service Production/voircmdalivr.php"
        // ).success(function(data) {
        //     $scope.cmds = data;
        //     $scope.cmdid = data[index].ID_COMMANDE;
        //     // alert($scope.cmdid);
        // })
        // SweetAlert.swal({

        //     title: "Voulez-vous confirmer la commande?",
        //     text: "",
        //     type: "warning",
        //     showCancelButton: true,
        //     confirmButtonColor: "#DD6B55",
        //     confirmButtonText: "Oui, Confirmez!",
        //     cancelButtonText: "Non, Annulez!",
        //     closeOnConfirm: false,
        //     closeOnCancel: false
        // }, function(isConfirm) {
        //     if (isConfirm) {
        //         $http.post("http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Service Production/confirmeralivr.php", {
        //                 'id': $scope.cmdid
        //             })
        //             .success(function(data) {
        //                 //$scope.reload();
        //                 //$scope.show_cmdaprep();
        //                 setTimeout(function() {

        //                     window.location.reload();

        //                 }, 500);
        //             });
        //         SweetAlert.swal({
        //             title: "Confirmée",
        //             text: "Votre Commande a été confirmée.",
        //             type: "success",
        //             confirmButtonColor: "#007AFF"

        //         });
        //     } else {
        //         SweetAlert.swal({
        //             title: "Annulée!",
        //             text: "Votre commande a été annulée",
        //             type: "error",
        //             confirmButtonColor: "#007AFF"
        //         });
        //     }
        // });
    };

    // Show Record binded to this index
    // $scope.showme = function(index){
    //     $http.get(
    //         "http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/views/MyUpdate/php/voircmdaprep.php"
    //     ).success(function(data){
    //         //$scope.cmds = data;
    //         $scope.cmdx = data[index];
    //         $scope.update(data[index].ID_COMMANDE);
    //         //alert(data[index].ID_COMMANDE);
    //     })
    //     //alert($scope.cmdx.ID_COMMANDE);
    // }
    // Update Record based to this index
    // $scope.update = function(index){
    //     {
    //         if (confirm("Voulez vous vraiment de confirmer cette commande ?")) {
    //         $http.post("http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/views/MyUpdate/php/confirmer.php", {
    //         'id': index
    //         })
    //         .success(function(data) {
    //         //alert(data);
    //         $scope.show_cmdaprep();
    //         });
    //         } else {
    //         return false;
    //         }
    //         }
    // } 

    $scope.arra = function(index) {

        $http.get(
            "http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Service Production/voircmdaprep.php"
        ).success(function(data) {
            //$scope.cmds = data;
            $scope.cmdx = data[index];
            $scope.update(data[index].ID_COMMANDE);
            //alert(data[index].ID_COMMANDE);
        })
        var x = data[index].ID_COMMANDE;
        return x;

    }



    $scope.preparation = function(position, x) {


        // user.setQteCmd(x.QTE);
        // // alert($scope.cmdid);
        // user.setTempRecu(x.ID_COMMANDE);
        // user.setTempIDC(x.ID_CLIENT);
        // user.setRecuProdCpt(0);

        // $window.location.href = '#/app/RecuProd';



        SweetAlert.swal({

            title: "Voulez-vous confirmer la commande?",
            text: "",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Oui, Confirmez!",
            cancelButtonText: "Non, Annulez!",
            closeOnConfirm: false,
            closeOnCancel: false
        }, function(isConfirm) {
            if (isConfirm) {


                $http({
                    url: 'http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Service Production/confirmer.php',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: 'id=' + x.ID_COMMANDE
                }).success(function(response) {
                    // alert(response);
                    // alert(user.getTempRecu());
                    // alert(user.getID());
                    // alert(IdUser);
                    SweetAlert.swal({
                        title: "Confirmée",
                        text: "Votre Commande a été confirmée.",
                        type: "success",
                        confirmButtonColor: "#007AFF"



                    });

                    setTimeout(function() {

                        $window.location.href = "#/app/cmdl";

                    }, 200);
                });
            } else {
                SweetAlert.swal({
                    title: "Annulée!",
                    text: "Votre commande a été annulée",
                    type: "error",
                    confirmButtonColor: "#007AFF"
                });
            }
        });




        //             // $http({
        //             //     url: 'http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Service Production/confirmer.php',
        //             //     method: 'POST',
        //             //     headers: {
        //             //         'Content-Type': 'application/x-www-form-urlencoded'
        //             //     },
        //             //     data: 'id=' + x.ID_COMMANDE
        //             // }).success(function(response) {
        //             //     // alert(response);
        //             //     // alert(user.getTempRecu());
        //             //     // alert(user.getID());
        //             //     // alert(IdUser);
        //             //     
        //             // });

        // $aside.open({
        //     templateUrl: 'asideContent.html',
        //     placement: position,
        //     size: 'sm',
        //     backdrop: true,
        //     controller: function($scope, $uibModalInstance) {
        //         // alert(index);
        //         //Get Record of this Index
        //         // $http.get(
        //         //         "http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Service Production/voircmdaprep.php"
        //         //     ).success(function(data) {
        //         // $scope.cmds = data;
        //         // $scope.cmdid = data[index].ID_COMMANDE;
        //         // $scope.qte = data[index].QTE;
        //         // Qauntité des produit panier par rapport a une commande 
        //         user.setQteCmd(x.QTE);
        //         // alert($scope.cmdid);
        //         user.setTempRecu(x.ID_COMMANDE);
        //         user.setTempIDC(x.ID_CLIENT);
        //         // alert(user.getTempIDC());
        //         // })
        //         // Update Statut of commande
        //         $scope.ok = function(e) {
        //             // $rootScope.cpt=0;
        //             //alert( $scope.arra(index));
        //             user.setRecuProdCpt(0);

        //             // $http({
        //             //     url: 'http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Service Production/confirmer.php',
        //             //     method: 'POST',
        //             //     headers: {
        //             //         'Content-Type': 'application/x-www-form-urlencoded'
        //             //     },
        //             //     data: 'id=' + x.ID_COMMANDE
        //             // }).success(function(response) {
        //             //     // alert(response);
        //             //     // alert(user.getTempRecu());
        //             //     // alert(user.getID());
        //             //     // alert(IdUser);
        //             //     
        //             // });

        //             $window.location.href = '#/app/RecuProd';



        //             // $http.post("http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Service Production/confirmer.php", {
        //             //         'id': x.ID_COMMANDE
        //             //     })
        //             //     .success(function(data) {


        //             //         //$scope.show_cmdaprep();
        //             //         // $scope.IDCMD = user.getTempRecu();
        //             //         // alert($scope.IDCMD);


        //             //         // Preparation du reçu 
        //             //         // user.setTempRecu(data[index].ID_COMMANDE);
        //             //         // alert(" USER TEMP " + user.getID());
        //             //         // alert("CMD TEMP " + user.getTempRecu());
        //             //     });
        //             $uibModalInstance.close();
        //             e.stopPropagation();
        //         };
        //         $scope.cancel = function(e) {
        //             $uibModalInstance.dismiss();
        //             e.stopPropagation();
        //         };
        //     }
        // });
    };


    $scope.SP_Prete = function() {


        // alert(user.getTempRecu());

        SweetAlert.swal({

            title: "Voulez-vous confirmer la commande?",
            text: "",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Oui, Confirmez!",
            cancelButtonText: "Non, Annulez!",
            closeOnConfirm: false,
            closeOnCancel: false
        }, function(isConfirm) {
            if (isConfirm) {


                $http.post("http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Service Production/confirmeralivr.php", {
                        'id': user.getTempRecu()
                    })
                    .success(function(data) {
                        //$scope.reload();
                        //$scope.show_cmdaprep();
                        setTimeout(function() {

                            $window.location.href = '#/app/cmdl';

                        }, 500);
                    });
                SweetAlert.swal({
                    title: "Confirmée",
                    text: "Votre Commande a été confirmée.",
                    type: "success",
                    confirmButtonColor: "#007AFF"

                });
            } else {
                SweetAlert.swal({
                    title: "Annulée!",
                    text: "Votre commande a été annulée",
                    type: "error",
                    confirmButtonColor: "#007AFF"
                });
            }
        });


    }


    // PANIER : 

    // ETAPE 1 : AFFICHER TOUS LES PRODUITS 

    $scope.show_cmdacollecter = function(myvar) {

        // $scope.myvar = "collecte";

        // alert(myvar);
        $http.get(
            "http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Livreur/getAllProducts.php"
        ).success(function(data) {

            $scope.allproducts = data;
            // alert($scope.cmdacollects[1].NOM_CLIENT);
            // alert(data);

        }).error(function(data) {})
    };

    // ETAPE 2 : INSERTION DES PRODUITS DANS LA CARTE 

    $scope.addToCart = function(product) {

        /*
        if ($cookieStore.get('cart') !== null) {
                $scope.cart =  $cookieStore.get('cart');
        }
        */



        if ($scope.cart.length === 0) {
            product.count = 1;
            $scope.cart.push(product);
        } else {
            var repeat = false;
            for (var i = 0; i < $scope.cart.length; i++) {
                if ($scope.cart[i].ID_PRODUIT === product.ID_PRODUIT) {
                    repeat = true;
                    $scope.cart[i].count += 1;
                }
            }
            if (!repeat) {
                product.count = 1;
                $scope.cart.push(product);
            }
        }

        // Cookies Noraml 
        var expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 1);
        // $cookies.putObject('cart', $scope.cart, { 'expires': expireDate });
        // $scope.cart = $cookies.getObject('cart');

        $scope.total += parseFloat(product.PRIX);
        $cookies.put('total', $scope.total, { 'expires': expireDate });

        // Bouhdha
        // window.localStorage.set("MyObj", JSON.stringify($scope.cart));

        $localStorage.panier = $scope.cart;

    };

    // ETAPE 3 : INSERTION 



    $scope.products = $scope.allproducts;
    $scope.cart = [];
    $scope.total = 0;
    // PANIER === All Product Listing
    $scope.myallproducts = function(size) {

        // alert($scope.total);
        $aside.open({
            templateUrl: 'asideContent1.html',
            placement: 'right',
            // size: size,
            backdrop: true,
            controller: function($scope, $uibModalInstance) {
                // $scope.MyselectedProducts = cartService.getProducts();
                // $scope.cart = $cookies.getObject('cart');
                if (!angular.isUndefined($cookies.get('total'))) {
                    $scope.total = parseFloat($cookies.get('total'));
                }
                //Sepetimiz daha önceden tanımlıysa onu çekelim
                // if (!angular.isUndefined($cookies.get('cart'))) {
                //     $scope.cart = $cookies.getObject('cart');
                // }
                if (!angular.isUndefined($localStorage.panier)) {

                    $scope.cart = $localStorage.panier;

                }

                $scope.removeItemCart = function(product) {
                        $scope.cart = $localStorage.panier;


                        if (product.count > 1) {
                            product.count -= 1;
                            var expireDate = new Date();
                            expireDate.setDate(expireDate.getDate() + 1);
                            // $cookies.putObject('cart', $scope.cart, { 'expires': expireDate });
                            // $scope.cart = $cookies.getObject('cart');
                            $localStorage.panier = $scope.cart;
                        } else if (product.count === 1) {

                            var index = $scope.cart.indexOf(product);
                            $scope.cart.splice(index, 1);
                            $localStorage.panier = $scope.cart;




                            expireDate = new Date();
                            expireDate.setDate(expireDate.getDate() + 1);
                            // $cookies.putObject('cart', $scope.cart, { 'expires': expireDate });
                            // $scope.cart = $cookies.getObject('cart');



                        }

                        $scope.total -= parseFloat(product.PRIX);
                        $cookies.put('total', $scope.total, { 'expires': expireDate });

                    }
                    // $rootScope.mycartsDB = cartService.getProducts();
                $scope.ok = function(e) {
                    $scope.message = $localStorage.panier;
                    //     // for (var i = 0; i < $scope.cart.length; i++) {
                    //     //     $scope.formData = {
                    //     //         'produiti': $scope.cart[i],
                    //     //         'quantitei': $scope.cart[i].count,
                    //     //         'totali': $scope.cart[i].PRIX * $scope.cart[i].count,
                    //     //         // 'idClient':user.getClientTempCmd(),
                    //     //         'idCmd': user.getCmdTemp()
                    //     //     };

                    // alert('good to go ');

                    for (var i = 0; i < $scope.message.length; i++) {
                        $scope.formData = {
                            'produiti': $scope.message[i],
                            'quantitei': $scope.message[i].count,
                            'totali': $scope.message[i].PRIX * $scope.message[i].count,
                            // 'idClient':user.getClientTempCmd(),
                            'idCmd': user.getCmdTemp()
                        };
                        $http.post('http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Livreur/ajouterpanier.php', {
                            cart: $scope.formData
                        }).success(function(data) {

                            // alert(data);


                        }).error(function(data) {})


                    }
                    $http.post('http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Livreur/UpdateStatusP.php', {
                        'id': user.getCmdTemp()
                    }).success(function(data) {

                        // alert(data);


                    }).error(function(data) {})

                    // $scope.cart=[];

                    $uibModalInstance.close();
                    e.stopPropagation();

                };
                $scope.cancel = function(e) {
                    $uibModalInstance.dismiss();
                    e.stopPropagation();
                };


                $scope.FetchPanier = function() {

                    // alert('good to go!');
                    $scope.message = $localStorage.panier;
                }
            }
        });



    };



    //  Impression Items : 
    $scope.MyAllBasketsX = function() {


        // alert(IdUser);
        // alert(" ID COMMANDE" + user.getTempRecu());
        // alert(" ID CLIENT " + user.getTempIDC());


        // $http({
        //    url: 'http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Client /MyAllBasketsX.php',
        //    method: 'POST',
        //    headers: {
        //        'Content-Type': 'application/x-www-form-urlencoded'
        //    },
        //    data: 'IdUser =' + IdUser + 'IDCMD =' + user.getTempRecu()
        //    }).success(function(response) {
        //        $scope.MyAllBasketsX = response;
        //        $scope.MyTotal = $scope.MyAllBasketsX[0].MyTotal;
        //        $scope.Myname = $scope.MyAllBasketsX[0].Myname;
        //        $scope.MyNbArticles = $scope.MyAllBasketsX[0].NbProduits;
        //    });
        $http.post("http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Client /MyAllBasketsX.php", {

            'IdUser': user.getTempIDC(),
            'IDCMD': user.getTempRecu()
        }).success(function(data) {
            $scope.MyAllBasketsX = data;
            $scope.MyTotal = data.MyTotal;
            // alert(data);
            // $scope.MyTotal = $scope.MyAllBasketsX[0].MyTotal;
            $scope.MyTotal = $scope.MyAllBasketsX[0].SUMNEW;
            // alert($scope.MyTotal)
            $scope.Myname = $scope.MyAllBasketsX[0].Myname;
            $scope.MyNbArticles = $scope.MyAllBasketsX[0].NbProduits;
            // alert($scope.MyAllBasketsX[0].MyTotal);
        });
    };

    // $scope.MyAllBasketsX = function(){

    //     $http.get("http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Client /MyAllBasketsX.php")
    //     .success(function(data) {
    //     $scope.MyAllBasketsX = data;
    //     $scope.MyTotal = $scope.MyAllBasketsX[0].MyTotal;
    //     $scope.Myname = $scope.MyAllBasketsX[0].Myname;
    //     $scope.MyNbArticles = $scope.MyAllBasketsX[0].NbProduits;
    //     // alert($scope.MyAllBasketsX[0].MyTotal);

    //     });
    // };


    $scope.MyAllBasketsY = function() {

        $http.post("http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Client /MyAllBasketsX.php", {
            'IdUser': IdUser,
            'IDCMD': user.getTempRecu()
        }).success(function(data) {
            // $scope.MyAllBasketsX = data;
            // $scope.MyTotal = $scope.MyAllBasketsX[0].MyTotal;
            // $scope.Myname = $scope.MyAllBasketsX[0].Myname;
            // $scope.MyNbArticles = $scope.MyAllBasketsX[0].NbProduits;
            // // alert($scope.MyAllBasketsX[0].MyTotal);

        });
    };
    $scope.imprimer = function(position, p) {
        // $rootScope.cpt=+1;
        // alert($rootScope.cpt);

        // $http.post("http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Service Production/getSumQte.php", {
        //     'IDCMD': user.getTempRecu()
        // }).success(function(data) {
        //     $scope.qte = data.Quantite;
        //     alert(data);
        //     alert(data.Quantite);
        // });
        // Qte a ne pas depasser 
        // alert(user.getQteCmd());
        $scope.cptq = user.getQteCmd();
        $scope.cpta = user.getRecuProdCpt();
        $scope.cpta++;
        user.setRecuProdCpt($scope.cpta);
        // Compteur
        // alert($scope.cpta);
        // alert($scope.cptq);
        if ($scope.cpta >= $scope.cptq) {
            user.setRecuProdCpt(0);
        }

        // SweetAlert.swal({

        //     title: "Voulez-vous confirmer la commande?",
        //     text: "",
        //     type: "warning",
        //     showCancelButton: true,
        //     confirmButtonColor: "#DD6B55",
        //     confirmButtonText: "Oui, Confirmez!",
        //     cancelButtonText: "Non, Annulez!",
        //     closeOnConfirm: false,
        //     closeOnCancel: false
        // }, function(isConfirm) {
        //     if (isConfirm) {
        //         $http.post("http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Service Production/confirmeralivr.php", {
        //                 'id': $scope.cmdid
        //             })
        //             .success(function(data) {
        //                 //$scope.reload();
        //                 //$scope.show_cmdaprep();
        //                 setTimeout(function() {

        //                     window.location.reload();

        //                 }, 500);
        //             });
        //         SweetAlert.swal({
        //             title: "Confirmée",
        //             text: "Votre Commande a été confirmée.",
        //             type: "success",
        //             confirmButtonColor: "#007AFF"

        //         });
        //     } else {
        //         SweetAlert.swal({
        //             title: "Annulée!",
        //             text: "Votre commande a été annulée",
        //             type: "error",
        //             confirmButtonColor: "#007AFF"
        //         });
        //     }
        // });


        // IMPRIMABLE
        $aside.open({
            templateUrl: 'invoice.html',
            // placement: position,
            // size: 'lg',
            backdrop: true,
            scope: $scope,
            controller: function($scope, $uibModalInstance) {
                $scope.MyProductInfo = p;
                // alert(p);
                $scope.ok = function(e) {
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

    function pdfToHTML() {
        var pdf = new jsPDF('p', 'pt', 'letter');
        source = $('#contentPdf')[0];
        specialElementHandlers = {
            '#bypassme': function(element, renderer) {
                return true
            }
        }
        margins = {
            top: 50,
            left: 60,
            width: 545
        };
        pdf.fromHTML(
                source // HTML string or DOM elem ref.
                , margins.left // x coord
                , margins.top // y coord
                , {
                    'width': margins.width // max width of content on PDF
                        ,
                    'elementHandlers': specialElementHandlers
                },
                function(dispose) {
                    // dispose: object with X, Y of the last line add to the PDF
                    //          this allow the insertion of new lines after html
                    pdf.save('MonRecu.pdf');
                }
            )
            // alert("It s me !!");
    }


    function pdfToHTML1() {
        var pdf = new jsPDF('p', 'pt', 'letter');
        source = $('#allInvoices')[0];
        specialElementHandlers = {
            '#bypassme': function(element, renderer) {
                return true
            }
        }
        margins = {
            top: 50,
            left: 60,
            width: 545
        };
        pdf.fromHTML(
                source // HTML string or DOM elem ref.
                , margins.left // x coord
                , margins.top // y coord
                , {
                    'width': margins.width // max width of content on PDF
                        ,
                    'elementHandlers': specialElementHandlers
                },
                function(dispose) {
                    // dispose: object with X, Y of the last line add to the PDF
                    //          this allow the insertion of new lines after html
                    pdf.save('MonRecu.pdf');
                }
            )
            // alert("It s me !!");
    }


    $scope.RemoveItem = function(p) {

        user.setQteCmd(p.QTE);

        SweetAlert.swal({

            title: "Voulez-vous confirmer la commande?",
            text: "",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Oui, Confirmez!",
            cancelButtonText: "Non, Annulez!",
            closeOnConfirm: false,
            closeOnCancel: false
        }, function(isConfirm) {
            if (isConfirm) {


                $http.post("http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Service Production/RemoveItem.php", {
                    'idCmd': user.getTempRecu(),
                    'idProd': p.ID_PRODUIT,


                }).success(function(response) {
                    // alert(response);
                    // alert(user.getTempRecu());
                    // alert(user.getID());
                    // alert(IdUser);
                    SweetAlert.swal({
                        title: "Confirmée",
                        text: "La produit a été supprimé.",
                        type: "success",
                        confirmButtonColor: "#007AFF"



                    });

                    setTimeout(function() {

                        $window.location.href = "#/app/cmdl";

                    }, 200);
                });
            } else {
                SweetAlert.swal({
                    title: "Annulée!",
                    text: "Votre commande a été annulée",
                    type: "error",
                    confirmButtonColor: "#007AFF"
                });
            }
        });




    }



    $scope.EditPrice = function(position, p) {
        // $http.post("http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Service Production/PanierProductCmd.php", {
        //     'idCmd': user.getTempRecu()

        // }).success(function(data) {

        //     $scope.Idpro = data[index].ID_PRODUIT;
        //     alert($scope.Idpro);
        //      });







        $aside.open({
            templateUrl: 'asideContent.html',
            placement: position,
            size: 'sm',
            backdrop: true,
            controller: function($scope, $uibModalInstance) {

                // Update Statut of commande
                $scope.ok = function(e) {
                    // $rootScope.cpt=0;
                    //alert( $scope.arra(index));
                    $http.post("http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Service Production/UpdatePrice.php", {
                        'idCmd': user.getTempRecu(),
                        'idProd': p.ID_PRODUIT,
                        'MontantProd': $scope.mon
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


    }





});
// app.controller('AsideCtrl', ["$scope", "$aside","$http", function ($scope, $aside,$http) {
//     $scope.openAside = function (position) {
//         $aside.open({
//             templateUrl: 'asideContent.html',
//             placement: position,
//             size: 'sm',
//             backdrop: true,
//             controller: function ($scope, $uibModalInstance) {
//                 $scope.ok = function (e) {
//                     $uibModalInstance.close();
//                     e.stopPropagation();
//                 };
//                 $scope.cancel = function (e) {
//                     $uibModalInstance.dismiss();
//                     e.stopPropagation();
//                 };

//                 // function remplir($scope,index) {
//                 //     $http({
//                 //         url: 'request-url',
//                 //         method: "POST",
//                 //         data: { 'message' : message }
//                 //     })
//                 //     .then(function(response) {
//                 //             // success
//                 //     }, 
//                 //     function(response) { // optional
//                 //             // failed
//                 //     });
//                 // }

//             }
//         });
//     };
// }]);