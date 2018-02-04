'use strict';
/**
 * controllers for dynamic table
 * Remove/delete a table row dynamically 
 */

// $('#dit1').change(function() {
//     $('#dit2').val = ($(this).val());
// })

app.controller("dynamicTableCtrl", ['$scope', 'SweetAlert', '$http', '$rootScope', '$aside', '$log', 'user', '$window', '$uibModal', function($scope, SweetAlert, $http, $rootScope, $aside, $log, user, $window, $uibModal) {


    // Declaration Vars  



    // var Id_Client = user.getID(); // ID CLIENT
    var prof = user.profil(); // PRENOM
    var nom = user.nom(); // NOM 
    var IDUSER = user.getID(); // ID USER 
    $scope.full = user.getTempNameCmd() + " " + user.getTempProfileCmd();
    $scope.idclient = user.getClientTemp();



    $scope.reserver = function() {
        // ETAPE 1 : CREATION DE L'ID COMMANDE 
        $rootScope.idc += 1;


        // alert( $scope.adr1 +", "+ user.getLocalisation());

        $scope.idcommande = IDUSER + $scope.nbrd + prof[0] + nom[0] + $scope.idc;
        // alert($scope.IDClient);
        // alert($scope.idcommande);
        // Affichage des infroamtions TEST
        alert(" JOUR COMMANDE " + $scope.dt);
        alert(" ID COMMANDE " + $scope.idcommande);
        alert(" HEURE COMMANDE " + $scope.timecmd);
        alert(" NBR ARTICLES  COMMANDE " + $scope.nbrd);
        // alert(" DATE COMMANDE " + $scope.dateID);
        alert("not null you can do command");
        alert(" ID CLIENT " + IDUSER);

        // ETAPE 2: CREATION DE LA COMMANDE & ID DATE
        $http.post(
            "http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Client /InsertGetDate.php", {

            }
        ).success(function(response) {
            // scope id data 
            $scope.dateID = response.ID;
            alert($scope.dateID);
            if ($scope.dateID != null) {
                // L'AJOUT DE LA COMMANDE
                $http.post(
                    "http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Client /InsertCommande.php", {
                        'DD': $scope.dt,
                        'IDCMD': $scope.idcommande,
                        'HT': $scope.timecmd,
                        'nbrd': $scope.nbrd,
                        'IDDATE': $scope.dateID,
                        'IDCLIENT': IDUSER

                    }
                ).success(function(data) {
                    // alert(data.ID);
                });


            }
        })

        // Modification de l'adresse 

        $http.post("http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Client /UpdateAdresseCollecte.php", {
            'idLocal': user.getIdLocalTempclient(),
            'AdresseCompleteCollect': $scope.adr1 + ", " + user.getLocalisation()
        }).success(function(data) {
            // alert(data.ID);
            alert(data);
        });
    };
    // FIN  : RESERVATION PAR CLIENT *CLIENT*


    // DEBUT : REDIRECTION
    $scope.Redirect = function(index) {
            $http.get("http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/ServiceClients/getClients.php")
                .success(function(data) {
                    $scope.getclc = data;
                    $scope.IDC = data[index].ID_CLIENT;
                    // $scope.NOM = data[index].NOM_CLIENT;
                    // $scope.PRENOM = data[index].PRENOM_CLIENT;
                    // alert($scope.IDC);
                    user.setTempProfileCmd(data[index].PRENOM_CLIENT);
                    user.setTempNameCmd(data[index].NOM_CLIENT);
                    user.clientTemp(data[index].ID_CLIENT);
                    user.setIdLocalTempClient(data[index].ID_LOCALISATION);
                    alert(" USER TEMP " + user.getClientTemp());
                    alert(" NOM TEMP " + user.getTempNameCmd());
                    alert(" PRENOM TEMP " + user.getTempProfileCmd());
                    alert("ID LOCALISATION TMEP " + user.getIdLocalTempclient());

                    // $location.path('/Client');
                    $window.location.href = '#/app/ReserverSC';
                    // alert($window.location.names);
                })



            // 
        }
        // FIN : REDIRECTION 

    $scope.Ret = function() {
        $window.location.href = '#/app/CommandesEnCours';
    };

    //  DEBUT : REDIRECTION VERS RECU 
    // DEBUT : REDIRECTION
    $scope.RedirectR = function(r) {
            //  $http.post("http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Client /getCommandesRecu.php", {

            //     'IdUser': IDUSER
            // }).success(function(response) {
            //          $scope.recu = response;
            //     // alert($scope.historique);


            //         // $scope.IDCMD = data[index].ID_COMMANDE;
            //         // alert(IDUSER);
            //         // $scope.NOM = data[index].NOM_CLIENT;
            //         // $scope.PRENOM = data[index].PRENOM_CLIENT;
            //         
            alert(r.ID_COMMANDE);
            user.setTempIDC(r.ID_CLIENT);
            user.setTempRecu(r.ID_COMMANDE);
            alert(" USER TEMP " + user.getTempIDC());
            alert("CMD TEMP " + user.getTempRecu());
            // $location.path('/Client');
            $window.location.href = '#/app/RecuClient';
            // alert($window.location.names);
            //     })




            // 
        }
        // FIN : REDIRECTION 
        // FIN : REDIRECTION VERS RECU 



    //  DEBUT : RESERVATION CLIENT APRES REDIRECTION *SERVICE CLIENT*
    // pro = user.getTempProfileCmd();
    // na = user.getTempNameCmd();


    $scope.ResPourClient = function() {

        $rootScope.idc += 1;
        // ETAPE 1 : CREATION
        var idUser = user.getClientTemp();
        var FirstNameUser = user.getTempProfileCmd();
        var LastNameUser = user.getTempNameCmd();
        $scope.IdCmdUser = $scope.nbrd + FirstNameUser[0] + LastNameUser[0] + $scope.idc;


        // Affichage des infroamtions TEST
        alert(" JOUR COMMANDE " + $scope.dt);
        alert(" ID COMMANDE " + $scope.IdCmdUser);
        alert(" HEURE COMMANDE " + $scope.timecmd);
        alert(" NBR ARTICLES  COMMANDE " + $scope.nbrd);
        // alert(" DATE COMMANDE " + $scope.dateID);
        alert("ID USER " + idUser);
        alert("not null you can do command");

        // CREATION DE LA COMMANDE 


        // ETAPE 2: CREATION DE L 'ID DATE 
        $http.post(
            "http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Client /InsertGetDate.php", {

            }
        ).success(function(response) {
            // scope id data 
            $scope.dateID = response.ID;
            alert($scope.dateID);
            if ($scope.dateID != null) {
                // Ajout de la commande 
                $http.post(
                    "http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Client /InsertCommande.php", {
                        'DD': $scope.dt,
                        'IDCMD': $scope.IdCmdUser,
                        'HT': $scope.timecmd,
                        'nbrd': $scope.nbrd,
                        'IDDATE': $scope.dateID,
                        'IDCLIENT': idUser,
                        'idLocal': user.getIdLocalTempclient()

                    }
                ).success(function(data) {
                    // alert(data.ID);
                });


            }

            // Modification de l'adresse 

            $http.post("http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Client /UpdateAdresseCollecte.php", {
                'idLocal': user.getIdLocalTempclient(),
                'AdresseCompleteCollect': $scope.adrz1 + ", " + user.getLocalisation()
            }).success(function(data) {
                // alert(data.ID);
                alert(data);
            });
        });

        // Modification de l'adresse 

        // $http.post("http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Client /InsertCommande.php", {
        //            'idLocal' : user.getIdLocalTempclient()
        //           }
        //           ).success(function(data) {
        //               // alert(data.ID);
        //           });


        //     $http.post("http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Client /",{}).success(function(resp){}) 
    };
    //  FIN : RESERVATION CLIENT APRES REDIRECTION *SERVICE CLIENT*



    //selection du dernier ID_DATE

    $scope.selectdate = function() {
        $http.get("http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/GetDate.php")
            .success(function(data) {
                $scope.dates = data;
            })
    }



    //insertion 

    $scope.insert = function() {
        if ($scope.nom == null) {
            alert("Enter Your Name");
        } else if ($scope.prenom == null) {
            alert("Enter Your Email ID");
        } else if ($scope.email == null) {
            alert("Enter Your Age");
        } else {
            $http.post(
                "http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/js/controllers/insert.php", {
                    'nom': $scope.nom,
                    'prenom': $scope.prenom,
                    'tel': $scope.tel,
                    'email': $scope.email,
                    'mdp': $scope.mdp
                }
            ).success(function(data) {
                alert(data);
                $scope.nom = null;
                $scope.prenom = null;
                $scope.email = null;
                $scope.tel = null;
                // $scope.show_data();
            });
        }
    }

    //selection 

    $scope.show_data = function() {
        $http.get("http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/js/controllers/display.php")
            .success(function(data) {
                $scope.names = data;
            });
    };
    // Client 
    // Selection Commandes En Cours 
    // Valable aussi pour le SC 

    $scope.getCommandesEncours = function() {

        alert(IDUSER);

        $http({
            url: 'http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Client /getCommandes.php',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: 'Iduser=' + IDUSER
        }).success(function(response) {
            // alert(response.status);
            // alert(response.STATUS);
            $scope.names = response;




        });


    };
    $scope.getCommandesRecu = function() {



        $http({
            url: 'http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Client /getCommandesRecu.php',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: 'Iduser=' + IDUSER
        }).success(function(response) {
            // alert(response.status);
            // alert(response.STATUS);
            $scope.recu = response;




        });
        // $http.post("http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Client /getCommandesRecu.php", {

        //     'IdUser': IDUSER
        // }).success(function(response) {
        //     $scope.recu = response.data;

        //     // alert(data[IDUSER].STATUS);
        //     alert(response.data);
        //declare an array for(var i = 0 ; i < data.length; i++)
        // {
        //      if(data[i].STATUS== "PRETE")
        //      {
        //         $scope.arr = 10;
        //      }
        //      else 
        //      {
        //         $scope.arr = 20;
        //      }

        // }

        // 

        // alert(data.STATUS);
        // alert(data);
        // alert(data.STATUS);
        // alert($scope.historique);



    };


    $scope.getCmdWait = function() {
        $http.post("http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/ServiceClients/getCmdWait.php", {

            'IdUser': IDUSER
        }).success(function(data) {
            $scope.CmdWait = data;
            // alert($scope.historique);
        });


    };

    //  Service Clients : Recuperer to les commandes finis 

    $scope.getCmdDone = function() {
        $http.post("http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/ServiceClients/getCmdDone.php", {

            'IdUser': IDUSER
        }).success(function(data) {
            $scope.CmdWait = data;
            // alert($scope.historique);
        });


    };

    // Selection Historique Des Commandes 
    $scope.getHistorique = function() {
        // $http.get("http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Client /getHistorique.php")
        $http.post("http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Client /getHistorique.php", {

            'IdUser': IDUSER
        }).success(function(data) {
            $scope.historique = data;
        });
    };

    // $scope.getHistorique = function() {
    //     // var IDUSER = user.getID();
    //      $http.post("http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Client /getHistorique.php", {

    //         'IdUser': IDUSER
    //     }).success(function(data) {
    //         $scope.historique = data;
    //         // alert($scope.historique);
    //     });


    // };


    // Service Client 
    // Selection Clients 

    $scope.getClient = function() {

        $http.get("http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/ServiceClients/getClients.php")
            .success(function(data) {
                $scope.clientsc = data;
            });

    };

    $scope.UpdateDate = function() {

        $http.post("http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/ServiceClients/UpdarteHrCommandes.php", {
            'ID': $scope.id_cmd,
            'DD': $scope.dt,
            'HR': $scope.ht
        }).success(function() {

            $scope.sucessmodif = "modification reussie";

        });
    }



    // script de modification 


    // $scope.UpdateStatut = function() {
    //         $http.post("http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Service Clients/UpdarteHrCommandes.php", {
    //             'ID': $scope.id_cmd,
    //             'STATUS': $scope.status
    //         }).success(function() {
    //             $scope.sucestat = "changement de statut reussie"
    //         })
    //     }
    // $scope.ModifHrCmd = function() {
    //     $http.post(""), {
    //         'ID': $scope.id_cmd,
    //         'DD': $scope.dt,
    //         'HR': $scope.ht
    //     }
    // }.success(function(data) {
    //     alert("Modification Ok ");
    // });

    // Localistion 
    $scope.getadresse = function() {

        if (!!navigator.geolocation) {

            var map;

            var mapOptions = {
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            map = new google.maps.Map(document.getElementById('google_canvas'), mapOptions);

            navigator.geolocation.getCurrentPosition(function(position) {

                var geolocate = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

                var infowindow = new google.maps.InfoWindow({
                    map: map,
                    position: geolocate,
                    content: '<h1>Location pinned from HTML5 Geolocation!</h1>' +
                        '<h2>Latitude: ' + position.coords.latitude + '</h2>' +
                        '<h2>Longitude: ' + position.coords.longitude + '</h2>'
                });

                map.setCenter(geolocate);

                // document.getElementsByName('alt')[0].value=position.coords.latitude;
                // document.getElementsByName('lgt')[0].value=position.coords.longitude;
                var lat = parseFloat(position.coords.latitude);
                var lng = parseFloat(position.coords.longitude);
                var latlng = new google.maps.LatLng(lat, lng);
                var geocoder = geocoder = new google.maps.Geocoder();
                geocoder.geocode({ 'latLng': latlng }, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (results[1]) {
                            alert("Location: " + results[1].formatted_address);
                            //document.getElementById('fadrs').innerHTML=results[1].formatted_address;
                            $scope.mylat = parseFloat(position.coords.latitude);
                            $scope.mylng = parseFloat(position.coords.longitude);
                            $scope.myadress = results[1].formatted_address;
                            user.setLocalisation(results[1].formatted_address);

                        }
                    }
                });

            });

        } else {
            document.getElementById('google_canvas').innerHTML = 'No Geolocation Support.';
        }

    }

    // Directive Aside Change Date



    // $scope.dateChange = function(position, index) {
    //     $aside.open({
    //         templateUrl: 'asideContent.html',
    //         placement: position,
    //         size: 'sm',
    //         backdrop: true,
    //         controller: function($scope, $uibModalInstance) {
    //             //alert(index);
    //             //Get Record of this Index
    //             $http.get(
    //                     "http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Service Production/voircmdalivr.php").success(function(data) {
    //                     $scope.cmds = data;
    //                     $scope.cmdid = data[index].ID_COMMANDE;
    //                     // alert($scope.cmdid);
    //                 })
    //                 // Update Statut of commande
    //             $scope.ok = function(e) {

    //                 //alert( $scope.arra(index));
    //                 $http.post("http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Service Production/confirmeralivr.php", {
    //                         'id': $scope.cmdid
    //                     })
    //                     .success(function(data) {
    //                         alert(data);
    //                         //$scope.show_cmdaprep();
    //                     });
    //                 $uibModalInstance.close();
    //                 e.stopPropagation();
    //             };
    //             $scope.cancel = function(e) {
    //                 $uibModalInstance.dismiss();
    //                 e.stopPropagation();
    //             };
    //         }
    //     });
    // };

    // Sweet Alert Confirmation 


    $scope.demo5 = function(x) {
        // $http.get("http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/ServiceClients/getCmdWait.php")
        //     .success(function(data) {
        //         $scope.getcmdn = data;
        //         $scope.IDn = data[index].ID_COMMANDE;
        //         alert($scope.IDn);

        //     })
        alert(x.ID_COMMANDE);
        SweetAlert.swal({

            title: "Voulez-vous confirmer la commande ?",
            text: "La commande sera prochainement confirmée!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Oui",
            cancelButtonText: "Non!",
            closeOnConfirm: false,
            closeOnCancel: false
        }, function(isConfirm) {
            if (isConfirm) {
                // $http.post("http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/ServiceClients/UpdateStatut.php", {
                //         'id': x.ID_COMMANDE
                //     })
                //     .success(function(data) {
                //         //$scope.reload();
                //         //$scope.show_cmdaprep();
                //     });


                $http({
                    url: 'http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/ServiceClients/UpdateStatut.php',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: 'id=' + x.ID_COMMANDE
                }).success(function(response) {

                     setTimeout(function() {

                    window.location.reload();

                }, 500);


                });


               

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


    // COnfirmation de la commande SC : 
    $scope.ConfDone = function(position, x) {

        SweetAlert.swal({
            // data[index].NOM_CLIENT
            title: "Voulez-vous confirmer la commade de  " + x.NOM_CLIENT + "?",
            text: "La commande sera prochainement confirmée!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Oui",
            cancelButtonText: "Non!",
            closeOnConfirm: false,
            closeOnCancel: false
        }, function(isConfirm) {
            if (isConfirm) {
                $http.post("http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/ServiceClients/UpdateStatutDone.php", {
                        'id': x.ID_COMMANDE
                    })
                    .success(function(data) {
                        //$scope.reload();
                        //$scope.show_cmdaprep();
                    });

                setTimeout(function() {

                    window.location.reload();

                }, 500);

            } else {
                SweetAlert.swal({
                    title: "Annulée!",
                    text: "La commande de " + x.NOM_CLIENT + " a été annulée",
                    type: "error",
                    confirmButtonColor: "#007AFF"
                });
            }
        });

    };



    // $scope.demo5 = function(index) {


    //     $http.get("http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Client/getCommandes.php")
    //         .success(function(data) {
    //             $scope.getcmdn = data;
    //             $scope.IDn = data[index].ID_COMMANDE;
    //         })

    //     $http.get(
    //         "http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Service Production/voircmdalivr.php"
    //     ).success(function(data) {
    //         $scope.cmds = data;
    //         $scope.cmdid = data[index].ID_COMMANDE;
    //         // alert($scope.cmdid);
    //     })
    //     SweetAlert.swal({

    //         title: "Voulez Vous Vraiment Confirmer La Commande ?",
    //         text: "La commande sera prochainement confirmée!",
    //         type: "warning",
    //         showCancelButton: true,
    //         confirmButtonColor: "#DD6B55",
    //         confirmButtonText: "Oui, Confirmez!",
    //         cancelButtonText: "Non, Annulez!",
    //         closeOnConfirm: false,
    //         closeOnCancel: false
    //     }, function(isConfirm) {
    //         if (isConfirm) {
    //             $http.post("http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Service Clients/UpdateStatut.php", {
    //                     'id': $scope.IDn
    //                 })
    //                 .success(function(data) {

    //                 });
    //             SweetAlert.swal({
    //                 title: "Confirmée!",
    //                 text: "Votre Commande a été confirmée.",
    //                 type: "success",
    //                 confirmButtonColor: "#007AFF"

    //             });
    //         } else {
    //             SweetAlert.swal({
    //                 title: "Annulée!",
    //                 text: "Pas de Changement 🙂",
    //                 type: "error",
    //                 confirmButtonColor: "#007AFF"
    //             });
    //         }
    //     });










    // $scope.addRowAsyncAsNV = function() {
    //     $scope.companies.push({ 'name': $scope.name, 'employees': $scope.employees, 'headoffice': $scope.headoffice });
    //     // Writing it to the server
    //     //		
    //     var data = 'name=' + $scope.name + '&employees=' + $scope.employees + '&headoffice=' + $scope.headoffice;
    //     $http.post('/savecompany', data)
    //         .success(function(data, status, headers, config) {
    //             $scope.message = data;
    //         })
    //         .error(function(data, status, headers, config) {
    //             alert("failure message: " + JSON.stringify({ data: data }));
    //         });
    //     // Making the fields empty
    //     //
    //     $scope.name = '';
    //     $scope.employees = '';
    //     $scope.headoffice = '';
    // };

    // $scope.removeRow = function(name) {
    //     var index = -1;
    //     var comArr = eval($scope.companies);
    //     for (var i = 0; i < comArr.length; i++) {
    //         if (comArr[i].name === name) {
    //             index = i;
    //             break;
    //         }
    //     }
    //     if (index === -1) {
    //         alert("Something gone wrong");
    //     }
    //     $scope.companies.splice(index, 1);
    // };




    $scope.today = function() {
        $scope.dt = new Date();
    };
    $scope.today();
    $scope.start = $scope.minDate;
    $scope.end = $scope.maxDate;

    $scope.clear = function() {
        $scope.dt = null;
    };
    $scope.datepickerOptions = {
        showWeeks: false,
        startingDay: 1
    };
    $scope.dateDisabledOptions = {
        dateDisabled: disabled,
        showWeeks: false,
        startingDay: 1
    };
    $scope.startOptions = {
        showWeeks: false,
        startingDay: 1,
        minDate: $scope.minDate,
        maxDate: $scope.maxDate
    };
    $scope.endOptions = {
        showWeeks: false,
        startingDay: 1,
        minDate: $scope.minDate,
        maxDate: $scope.maxDate
    };
    // Disable weekend selection
    function disabled(data) {
        var date = data.date,
            mode = data.mode;
        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    }


    $scope.setDate = function(year, month, day) {
        $scope.dt = new Date(year, month, day);
    };
    $scope.toggleMin = function() {
        $scope.datepickerOptions.minDate = $scope.datepickerOptions.minDate ? null : new Date();
        $scope.dateDisabledOptions.minDate = $scope.dateDisabledOptions.minDate ? null : new Date();
    };
    $scope.maxDate = new Date(2020, 5, 22);
    $scope.minDate = new Date(1970, 12, 31);

    $scope.open = function() {
        $scope.opened = !$scope.opened;
    };


    $scope.endOpen = function() {
        $scope.endOptions.minDate = $scope.start;
        $scope.startOpened = false;
        $scope.endOpened = !$scope.endOpened;
    };
    $scope.startOpen = function() {
        $scope.startOptions.maxDate = $scope.end;
        $scope.endOpened = false;
        $scope.startOpened = !$scope.startOpened;
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];

    $scope.hstep = 1;
    $scope.mstep = 15;

    // Time Picker
    $scope.options = {
        hstep: [1, 2, 3],
        mstep: [1, 5, 10, 15, 25, 30]
    };

    $scope.ismeridian = false;
    $scope.toggleMode = function() {
        $scope.ismeridian = !$scope.ismeridian;
    };

    $scope.update = function() {
        var d = new Date();
        d.setHours(14);
        d.setMinutes(0);
        $scope.dt = d;
    };

    $scope.changed = function() {
        $log.log('Time changed to: ' + $scope.dt);
    };

    $scope.clear = function() {
        $scope.dt = null;
    };
    // Modification de date collecte 
    $scope.dtclick = function() {
        $http.post("http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/ServiceClients/UpdarteHrCommandes.php", {
                'ID': $scope.cmdid,
                'DD': $scope.dtt,
                'HT': $scope.hrr,
            })
            .success(function(data) {
                // alert(data[index].DD_COMMANDE);
                //$scope.show_cmdaprep();

                setTimeout(function() {

                    window.location.reload();

                }, 500);
            });
        alert($scope.dtt);
        alert($scope.hrr);
        alert($scope.cmdid);


        // $scope.dtime = $scope.dtt;
        // $scope.dhour = $scope.hrr;
    };


    // Modification de date de livraison : 

    $scope.ChangeDateExp = function(e) {


        $http.post("http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/ServiceClients/UpdateDtCommande.php", {
                'ID': $scope.cmdid,
                'DD': $scope.dated,
                'HT': $scope.houred,
            })
            .success(function(data) {
                // alert(data[index].DD_COMMANDE);
                //$scope.show_cmdaprep();
            });
        alert($scope.dated);
        alert($scope.houred);
        alert($scope.cmdid);
        var d = document.getElementById("radio1");
        if (d.checked) {
            $http.post("http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Client /UpdateAdresseLivraison.php", {
                'idLocal': $scope.cmdid,
                'AdresseCompleteLivraison': $scope.idrliv
            }).success(function(data) {
                // alert(data.ID);
                alert(data);
            });


        } else
            $http.post("http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Client /UpdateAdresseLivraison.php", {
                'idLocal': $scope.cmdid,
                'AdresseCompleteLivraison': $scope.adrz1 + ", " + user.getLocalisation()
            }).success(function(data) {
                // alert(data.ID);
                alert(data);
            });

        setTimeout(function() {

            window.location.reload();

        }, 500);


        // SweetAlert.swal({

        //     title: "Voulez Vous Vraiment Confirmer La Commande ?",
        //     text: "La commande sera prochainement confirmée!",
        //     type: "warning",
        //     showCancelButton: true,
        //     confirmButtonColor: "#DD6B55",
        //     confirmButtonText: "Oui, Confirmez!",
        //     cancelButtonText: "Non, Annulez!",
        //     closeOnConfirm: false,
        //     closeOnCancel: false
        // }, function(isConfirm) {
        //     if (isConfirm) {
        //         $http.post("http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/ServiceClients/UpdateStatutDone.php", {
        //                 'id': $scope.cmdid
        //             })
        //             .success(function(data) {
        //                 //$scope.reload();
        //                 //$scope.show_cmdaprep();
        //             });
        //         SweetAlert.swal({
        //             title: "Confirmée!",
        //             text: "Votre Commande a été confirmée.",
        //             type: "success",
        //             confirmButtonColor: "#007AFF"

        //         });
        //     } else {
        //         SweetAlert.swal({
        //             title: "Annulée!",
        //             text: "Pas de Changement 🙂",
        //             type: "error",
        //             confirmButtonColor: "#007AFF"
        //         });
        //     }
        // });

    };



    $scope.ChangeDateClt = function(e) {


        $http.post("http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/ServiceClients/UpdateDtCommande.php", {
                'ID': $scope.cmdid,
                'DD': $scope.dated,
                'HT': $scope.houred,
            })
            .success(function(data) {
                // alert(data[index].DD_COMMANDE);
                //$scope.show_cmdaprep();
            });
        alert($scope.dated);
        alert($scope.houred);
        alert($scope.cmdid);
        var d = document.getElementById("radio1");
        if (d.checked) {
            $http.post("http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Client /UpdateAdresseLivraison.php", {
                'idLocal': $scope.cmdid,
                'AdresseCompleteLivraison': $scope.idrliv
            }).success(function(data) {
                // alert(data.ID);
                alert(data);
            });
        } else
            $http.post("http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Client /UpdateAdresseLivraison.php", {
                'idLocal': $scope.cmdid,
                'AdresseCompleteLivraison': $scope.adrz1 + ", " + user.getLocalisation()
            }).success(function(data) {
                // alert(data.ID);
                alert(data);
            });




    };

    // $scope.items = ['item1', 'item2', 'item3'];

    $scope.open = function(size, index) {

        var modalInstance = $uibModal.open({
            templateUrl: 'myModalContent.html',
            controller: function($scope, $uibModalInstance) {

                $http.post("http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Client /getHistorique.php", {

                    'IdUser': IDUSER
                }).success(function(data) {
                    $scope.cmds = data;
                    $scope.cmdid = data[index].ID_COMMANDE;
                    // alert($scope.cmdid);
                    alert($scope.cmdid);
                });

                $scope.ok = function(e) {

                    $http.post("http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Client /Commentaire.php", {
                        'idLocal': $scope.cmdid,
                        'Commentaire_Livreur': $scope.ComLiv,
                        'Commentaire_Service': $scope.ComSer
                    }).success(function(data) {
                        // alert(data.ID);
                        // alert(data);
                    });

                    // alert($scope.ComLiv);
                    // alert($scope.ComSer);


                    $uibModalInstance.close();
                    e.stopPropagation();
                };
                $scope.cancel = function(e) {
                    $uibModalInstance.dismiss();
                    e.stopPropagation();
                };
            },
            size: size
        });


    };



    ///  SERVICE CLIENT : Modifier la date pour la collecte 
    $scope.openAside = function(position, index) {
        $aside.open({
            templateUrl: 'asideContent.html',
            placement: position,
            size: 'sm',
            backdrop: true,
            controller: function($scope, $uibModalInstance) {
                // recuperation de l'index du tableau au modal Aside
                $http.get(
                    "http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/ServiceClients/getCmdWait.php").success(function(data) {
                    $scope.cmds = data;
                    $scope.cmdid = data[index].ID_COMMANDE;
                    // alert($scope.cmdid);
                    alert($scope.cmdid);
                })

                $scope.ok = function(e) {


                    $http.post("http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/ServiceClients/UpdarteHrCommandes.php", {
                            'ID': $scope.cmdid,
                            'DD': $scope.dtt,
                            'HT': $scope.hrr,
                        })
                        .success(function(data) {
                            // alert(data[index].DD_COMMANDE);
                            //$scope.show_cmdaprep();
                        });
                    alert($scope.dtt);
                    alert($scope.hrr);
                    alert($scope.cmdid);

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

    // // Service Clients : Modifier la date pour la livraison 
    $scope.OpenModif = function(position, x) {

        $aside.open({
            templateUrl: 'asideContent.html',
            placement: position,
            size: 'sm',
            backdrop: true,
            controller: function($scope, $uibModalInstance) {
                // recuperation de l'index du tableau au modal Aside
                // $http.get(
                //     "http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Service Clients/getCmdDone.php").success(function(data) {
                //     $scope.cmds = data;
                //     $scope.cmdid = data[index].ID_COMMANDE;
                //     $scope.idrliv = data[index].Adresse_Complete_Collect;
                // alert($scope.cmdid);
                $scope.cmdid = x.ID_COMMANDE;
                $scope.idrliv = x.Adresse_Complete_Collect;
                //        alert(r.ID_COMMANDE);
                // alert(r.Adresse_Complete_Collect);

                $scope.ok = function(e) {
                    // alert(index);
                    // alert($scope.dtt);
                    // alert($scope.hrr);

                    $uibModalInstance.close();
                    e.stopPropagation();
                };
                $scope.cancel = function(e) {
                    $uibModalInstance.dismiss();
                    e.stopPropagation();
                };
            }
        });
        // Confirmation 


    };


    $scope.ReserConfirm = function() {
        $rootScope.idc += 1;


        // alert( $scope.adr1 +", "+ user.getLocalisation());

        $scope.idcommande = IDUSER + $scope.nbrd + prof[0] + nom[0] + $scope.idc;
        // alert($scope.IDClient);
        // alert($scope.idcommande);
        // Affichage des infroamtions TEST
        alert(" JOUR COMMANDE " + $scope.dt);
        alert(" ID COMMANDE " + $scope.idcommande);
        alert(" HEURE COMMANDE " + $scope.timecmd);
        alert(" NBR ARTICLES  COMMANDE " + $scope.nbrd);
        alert(" DATE COMMANDE " + $scope.dateID);
        alert("not null you can do command");
        alert(" ID CLIENT " + IDUSER);


        SweetAlert.swal({
            title: "Voulez-vous passer une nouvelle commande?",
            text: "",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Oui",
            cancelButtonText: "Non",
            closeOnConfirm: false,
            closeOnCancel: false
        }, function(isConfirm) {


            if (isConfirm) {

              

                $http.post(
                    "http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Client /InsertGetDate.php", {

                    }
                ).success(function(response) {
                    // scope id data 
                    $scope.dateID = response.ID;
                    alert($scope.dateID);
                    if ($scope.dateID != null) {
                        // L'AJOUT DE LA COMMANDE
                        $http.post(
                            "http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Client /InsertCommande.php", {
                                'DD': $scope.dt,
                                'IDCMD': $scope.idcommande,
                                'HT': $scope.timecmd,
                                'nbrd': $scope.nbrd,
                                'IDDATE': $scope.dateID,
                                'IDCLIENT': IDUSER

                            }
                        ).success(function(response) {
                            alert(response);

                            // if($response.Feed);

                            $http.post("http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Client /UpdateAdresseCollecte.php", {
                            'idLocal': user.getIdLocalTempclient(),
                            'AdresseCompleteCollect': $scope.adr1 + ", " + user.getLocalisation()
                             }).success(function(data) {

                                SweetAlert.swal({
                                title: "Confirmée!",
                                text: "Votre commande est bien passeé",
                                type: "success",
                                confirmButtonColor: "#007AFF"
                                 });
                            // alert(data.ID);
                            alert(data);
                });
                            // alert(data.ID);
                        });


                    }
                })


                // Modification de l'adresse 

                // $http.post("http://ec2-18-218-197-120.us-east-2.compute.amazonaws.com/Pader/STANDARD/assets/php/Client /UpdateAdresseCollecte.php", {
                //     'idLocal': user.getIdLocalTempclient(),
                //     'AdresseCompleteCollect': $scope.adr1 + ", " + user.getLocalisation()
                // }).success(function(data) {
                //     // alert(data.ID);
                //     alert(data);
                // });


                SweetAlert.swal({
                    title: "Confirmée!",
                    text: "Votre commande est bien passeé",
                    type: "success",
                    confirmButtonColor: "#007AFF"
                });
            } else {
                SweetAlert.swal({
                    title: "Annulée",
                    text: "La commande est annulée!",
                    type: "error",
                    confirmButtonColor: "#007AFF"
                });
            }
        });
    };

}]);