'use strict';

/**
 * Config for the router
 */
app.config(['$stateProvider', '$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$ocLazyLoadProvider', 'JS_REQUIRES',
    function($stateProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $ocLazyLoadProvider, jsRequires) {

        app.controller = $controllerProvider.register;
        app.directive = $compileProvider.directive;
        app.filter = $filterProvider.register;
        app.factory = $provide.factory;
        app.service = $provide.service;
        app.constant = $provide.constant;
        app.value = $provide.value;

        // LAZY MODULES

        $ocLazyLoadProvider.config({
            debug: false,
            events: true,
            modules: jsRequires.modules
        });

        // APPLICATION ROUTES
        // -----------------------------------
        // For any unmatched url, redirect to /app/dashboard
        $urlRouterProvider.otherwise("/login/signin");
        //
        // Set up the states
        $stateProvider.state('app', {
                url: "/app",
                templateUrl: "assets/views/app.html",
                resolve: loadSequence('modernizr', 'moment', 'angularMoment', 'uiSwitch', 'perfect-scrollbar-plugin', 'toaster', 'ngAside', 'vAccordion', 'sweet-alert', 'chartjs', 'tc.chartjs', 'oitozero.ngSweetAlert', 'chatCtrl', 'truncate', 'htmlToPlaintext', 'angular-notification-icons'),
                abstract: true
            }).state('app.dashboard', {
                url: "/dashboard",
                templateUrl: "assets/views/dashboard.html",
                resolve: {
                    check: function($window, user) {
                        if (!user.isUserLoggedIn()) {
                            // $window.location.href = '#/login/signin';
                            $window.location.href = '#/login/error';
                            // $window.location.href = '#/login/signin';
                        }

                    },
                    scripts: loadSequence('jquery-sparkline', 'dashboardCtrl', 'user').deps
                },
                title: 'Dashboard',
                ncyBreadcrumb: {
                    label: 'Dashboard'
                },

            }).state('app.Panier', {
                url: "/Panier",
                templateUrl: "assets/views/Livreur/panier.html",
                resolve: {
                    check: function($window, user) {
                        if (!user.isUserLoggedIn()) {
                            $window.location.href = '#/login/error';
                        }
                    },
                    scripts: loadSequence('jquery-sparkline', 'touchspin-plugin', 'MyCtrl', 'vAccordionCtrl', 'dashboardCtrl').deps
                },
                title: 'Panier ',
                ncyBreadcrumb: {
                    label: 'Panier'
                }
            }).state('app.GestPers', {
                url: "/GestPers",
                templateUrl: "assets/views/Admin/gestion_personnel.html",
                resolve: loadSequence('jquery-sparkline', 'touchspin-plugin', 'ngTable', 'ngTableCtrl', 'dynamicTableCtrl', 'personnelCtrl', 'dashboardCtrl'),
                title: 'Gestion du personnel ',
                ncyBreadcrumb: {
                    label: 'Gestion du personnel'
                }
            }).state('app.GestProd', {
                url: "/GestProd",
                templateUrl: "assets/views/Admin/gestion_produit.html",
                resolve: loadSequence('jquery-sparkline', 'touchspin-plugin', 'ngTable', 'ngTableCtrl', 'dynamicTableCtrl', 'produitCtrl', 'dashboardCtrl'),
                title: 'Gestion des produits ',
                ncyBreadcrumb: {
                    label: 'Gestion des produits'
                }
            }).state('app.BdClients', {
                url: "/BdClients",
                templateUrl: "assets/views/ServiceClients/TableauSC_clients.html",
                resolve: {
                    check: function($window, user) {
                        if (!user.isUserLoggedIn()) {
                            $window.location.href = '#/login/error';
                        }
                    },
                    scripts: loadSequence('jquery-sparkline', 'touchspin-plugin', 'dynamicTableCtrl', 'ngTableCtrl', 'ngTable', 'dashboardCtrl').deps
                },
                title: ' Liste des Clients ',
                ncyBreadcrumb: {
                    label: 'Espace Service Clients'
                }
            }).state('app.Reservation', {
                url: "/Reservation",
                templateUrl: "assets/views/Client/reservation.html",
                resolve: {
                    check: function($window, user) {
                        if (!user.isUserLoggedIn()) {
                            $window.location.href = '#/login/error';
                        }
                    },
                    scripts: loadSequence('jquery-sparkline', 'touchspin-plugin', 'dynamicTableCtrl', 'dashboardCtrl').deps
                },
                title: 'Nouvelle reservation ',
                ncyBreadcrumb: {
                    label: 'Nouvelle reservation'
                }
            }).state('app.BdCommandes', {
                url: "/BdCommandes",
                templateUrl: "assets/views/ServiceClients/TableauSC.html",
                resolve: {
                    check: function($window, user) {
                        if (!user.isUserLoggedIn()) {
                            $window.location.href = '#/login/error';
                        }
                    },
                    scripts: loadSequence('jquery-sparkline', 'touchspin-plugin', 'dynamicTableCtrl', 'LivreurCtrl', 'dashboardCtrl').deps
                },
                title: 'Liste des commandes en attentes ',
                ncyBreadcrumb: {
                    label: 'Espace Service Clients'
                }
            }).state('app.BdCommandesDone', {
                url: "/BdCommandesDone",
                templateUrl: "assets/views/ServiceClients/TableauSCCmd.html",
                resolve: {
                    check: function($window, user) {
                        if (!user.isUserLoggedIn()) {
                            $window.location.href = '#/login/error';
                        }
                    },
                    scripts: loadSequence('jquery-sparkline', 'touchspin-plugin', 'dynamicTableCtrl', 'LivreurCtrl', 'dashboardCtrl').deps
                },
                title: 'Liste des livraisons en attentes ',
                ncyBreadcrumb: {
                    label: 'Espace Service Clients'
                }
            }).state('app.ReserverSC', {
                url: "/ReserverSC",
                templateUrl: "assets/views/ServiceClients/ReserPourClient.html",
                resolve: {
                    check: function($window, user) {
                        if (!user.isUserLoggedIn()) {
                            $window.location.href = '#/login/error';
                        }
                    },
                    scripts: loadSequence('jquery-sparkline', 'touchspin-plugin', 'dynamicTableCtrl', 'LivreurCtrl', 'dashboardCtrl').deps
                },
                title: 'Reserver Pour Un Client ',
                ncyBreadcrumb: {
                    label: 'Reserver Pour Un Client'
                }
            }).state('app.BdLSC', {
                url: "/ModificationCommande",
                templateUrl: "assets/views/ServiceLivraisons/ModificationCommande.html",
                resolve: {
                    check: function($window, user) {
                        if (!user.isUserLoggedIn()) {
                            $window.location.href = '#/login/error';
                        }
                    },
                    scripts: loadSequence('jquery-sparkline', 'touchspin-plugin', 'dynamicTableCtrl', 'dashboardCtrl').deps
                },
                title: 'Liste des commandes confirmé',
                ncyBreadcrumb: {
                    label: 'Liste des commandes confirmé'
                }
            }).state('app.SLSP', {
                url: "/PrepLivraison",
                templateUrl: "assets/views/ServiceLivraisons/CommandesALivrer.html",
                resolve: {
                    check: function($window, user) {
                        if (!user.isUserLoggedIn()) {
                            $window.location.href = '#/login/error';
                        }
                    },
                    scripts: loadSequence('jquery-sparkline', 'touchspin-plugin', 'dynamicTableCtrl', 'dashboardCtrl').deps
                },
                title: 'Liste des a livrer ',
                ncyBreadcrumb: {
                    label: 'Liste des commandes a livr'
                }

            }).state('app.calendrier', {
                url: "/Calendrier",
                templateUrl: "assets/views/ServiceClients/Calendrier.html",
                resolve: {
                    check: function($window, user) {
                        if (!user.isUserLoggedIn()) {
                            $window.location.href = '#/login/error';
                        }
                    },
                    scripts: loadSequence('moment', 'dynamicTableCtrl', 'mwl.calendar', 'calendarCtrl', 'dashboardCtrl').deps
                },
                title: 'Liste des commandes confirmé',
                ncyBreadcrumb: {
                    label: 'Liste des commandes confirmé'
                }
            }).state('app.cmdl', {
                url: "/cmdl",
                templateUrl: "assets/views/ServiceProductions/cmdalivr.html",
                resolve: {
                    check: function($window, user) {
                        if (!user.isUserLoggedIn()) {
                            $window.location.href = '#/login/error';
                        }
                    },
                    scripts: loadSequence('moment', 'dynamicTableCtrl', 'mwl.calendar', 'calendarCtrl', 'dashboardCtrl').deps
                },
                title: 'Liste des commandes a livré',
                ncyBreadcrumb: {
                    label: 'Liste des commandes à livrer'
                }
            }).state('app.ToCollecte', {
                url: "/ToCollecte",
                templateUrl: "assets/views/Livreur/ValidationCommandes.html",
                resolve: {
                    check: function($window, user) {
                        if (!user.isUserLoggedIn()) {
                            $window.location.href = '#/login/error';
                        }
                    },
                    scripts: loadSequence('moment', 'dynamicTableCtrl', 'mwl.calendar', 'LivreurCtrl', 'dashboardCtrl').deps
                },
                title: 'Liste des commandes a collecter',
                ncyBreadcrumb: {
                    label: 'Liste des commandes a collecter'
                }
            }).state('app.ToDeliver', {
                url: "/ToDeliver",
                templateUrl: "assets/views/Livreur/ValidationLivraison.html",
                resolve: {
                    check: function($window, user) {
                        if (!user.isUserLoggedIn()) {
                            $window.location.href = '#/login/error';
                        }
                    },
                    scripts: loadSequence('moment', 'dynamicTableCtrl', 'mwl.calendar', 'LivreurCtrl', 'dashboardCtrl').deps
                },
                title: 'Liste des commandes a Livrer',
                ncyBreadcrumb: {
                    label: 'Liste des commandes a Livrer'
                }
            }).state('app.CmdEnCours', {
                url: "/CommandesEnCours",
                templateUrl: "assets/views/Client/CmdEnCours.html",
                resolve: {
                    check: function($window, user) {
                        if (!user.isUserLoggedIn()) {
                            $window.location.href = '#/login/error';
                        }
                    },
                    scripts: loadSequence('jquery-sparkline', 'ngTable', 'ngTableCtrl', 'dynamicTableCtrl', 'dashboardCtrl').deps
                },
                title: 'Commandes En Cours ',
                ncyBreadcrumb: {
                    label: 'Commandes En Cours'
                }
            }).state('app.HistoriqueCmd', {
                url: "/HitoriqueCmd",
                templateUrl: "assets/views/Client/HistoriqueCmd.html",
                resolve: {
                    check: function($window, user) {
                        if (!user.isUserLoggedIn()) {
                            $window.location.href = '#/login/error';
                        }
                    },
                    scripts: loadSequence('jquery-sparkline', 'ngTable', 'ngTableCtrl', 'dynamicTableCtrl', 'dashboardCtrl').deps
                },
                title: 'Historique des commandes ',
                ncyBreadcrumb: {
                    label: 'Historique des commandes '
                }
            }).state('app.cmdp', {
                url: "/cmdp",
                templateUrl: "assets/views/ServiceProductions/cmdaprep.html",
                resolve: {
                    check: function($window, user) {
                        if (!user.isUserLoggedIn()) {
                            $window.location.href = '#/login/error';
                        }
                    },
                    scripts: loadSequence('moment', 'dynamicTableCtrl', 'mwl.calendar', 'calendarCtrl', 'dashboardCtrl').deps
                },
                title: 'Liste des commandes a preparer',
                ncyBreadcrumb: {
                    label: 'Liste des commandes à preparer'
                }
            }).state('app.RecuClient', {
                url: "/RecuClient",
                templateUrl: "assets/views/Client/RecuClient.html",
                resolve: {
                    check: function($window, user) {
                        if (!user.isUserLoggedIn()) {
                            $window.location.href = '#/login/error';
                        }
                    },
                    scripts: loadSequence('jquery-sparkline', 'touchspin-plugin', 'MyCtrl', 'dashboardCtrl').deps
                },
                title: 'Recu Client ',
                ncyBreadcrumb: {
                    label: 'Recu Client'
                }
            }).state('app.RecuProd', {
                url: "/RecuProd",
                templateUrl: "assets/views/ServiceProductions/RecuProd.html",
                resolve: {
                    check: function($window, user) {
                        if (!user.isUserLoggedIn()) {
                            $window.location.href = '#/login/error';
                        }
                    },
                    scripts: loadSequence('jquery-sparkline', 'touchspin-plugin', 'MyCtrl', 'dashboardCtrl').deps
                },
                title: 'Recu Client ',
                ncyBreadcrumb: {
                    label: 'Recu Client'
                }
            })
            // Login routes

        .state('login', {
            url: '/login',
            template: '<div ui-view class="fade-in-right-big smooth"></div>',
            abstract: true
        }).state('login.signin', {
            url: '/signin',
            templateUrl: "assets/views/login_login.html"
        }).state('login.forgot', {
            url: '/forgot',
            templateUrl: "assets/views/login_forgot.html"
        }).state('login.registration', {
            url: '/registration',
            templateUrl: "assets/views/Client/createAccount.html"
        }).state('login.lockscreen', {
            url: '/lock',
            templateUrl: "assets/views/login_lock_screen.html"
        }).state('login.error', {
            url: "/error",
            templateUrl: "assets/views/utility_404.html",
        });

        // Generates a resolve object previously configured in constant.JS_REQUIRES (config.constant.js)
        function loadSequence() {
            var _args = arguments;
            return {
                deps: ['$ocLazyLoad', '$q',
                    function($ocLL, $q) {
                        var promise = $q.when(1);
                        for (var i = 0, len = _args.length; i < len; i++) {
                            promise = promiseThen(_args[i]);
                        }
                        return promise;

                        function promiseThen(_arg) {
                            if (typeof _arg == 'function')
                                return promise.then(_arg);
                            else
                                return promise.then(function() {
                                    var nowLoad = requiredData(_arg);
                                    if (!nowLoad)
                                        return $.error('Route resolve: Bad resource name [' + _arg + ']');
                                    return $ocLL.load(nowLoad);
                                });
                        }

                        function requiredData(name) {
                            if (jsRequires.modules)
                                for (var m in jsRequires.modules)
                                    if (jsRequires.modules[m].name && jsRequires.modules[m].name === name)
                                        return jsRequires.modules[m];
                            return jsRequires.scripts && jsRequires.scripts[name];
                        }
                    }
                ]
            };
        }
    }
]);