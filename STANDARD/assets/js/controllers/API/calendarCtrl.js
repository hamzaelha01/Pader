
'use strict';
/**
 * Controller of the angularBootstrapCalendarApp
 */
app.controller('CalendarCtrl', ["$scope", "$aside", "moment", "SweetAlert", "$http", function($scope, $aside, moment, SweetAlert, $http) {


    var vm = this;
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    $scope.tester = function() {
        // Get All Commandes Are Not Ready 
        // Path : E:\STANDARD 2\STANDARD\assets\php\Service Clients\allcmdevents.php
        $http.get("http://18.221.242.75:3000/PADv1/STANDARD/assets/php/ServiceClients/allcmdevents.php")
            .success(function(data) {
                $scope.myevents = data;
                angular.forEach(data, function(event) {
                    // alert(event.DD_COMMANDE_M);
                    // console.log(event);
                    // $scope.myevents.push(event);
                    var myyear = event.DD_COMMANDE_Y;
                    var mymonth = Number(event.DD_COMMANDE_M || 0) - 1;
                    var myday = event.DD_COMMANDE_D;
                    var myhour = Number(event.DD_COMMANDE_H || 0);
                    var myminutes = Number(event.DD_COMMANDE_I || 0);
                    var typein = event.STATUS;
                    if(typein === "TO COLLECT"){
                        $scope.events.push({
                            title: event.ID_COMMANDE,
                            startsAt: new Date(myyear, mymonth, myday, myhour, myminutes),
                            type: 'job'
                        });
                    }
                    else if (typein === "TO DELIVER")
                    {
                        $scope.events.push({
                            title: event.ID_COMMANDE,
                            startsAt: new Date(myyear, mymonth, myday, myhour, myminutes),
                            type: 'off-site-work'
                        });
                    }
                    // $scope.mydate = event.DD_COMMANDE;
                    // alert('l annee est '+myyear+' le mois est '+ mymonth+' le jour est '+ myday+' l heure est '+ myhour+' les minutes sont'+myminutes);
                });
                //$scope.eventEdited($scope.events[$scope.events.length - 1]);
                // alert($scope.events[$scope.events.length - 1].title);
            });

    };
    // $scope.events = [
    //     // {
    //     //     title: 'Test Event',
    //     //     type: 'to-do',
    //     //     startsAt: new Date(2017, 12, 16, 0, 0)
    //     // },
    //   {
    //       title: 'Birthday Party',
    //       type: 'home',
    //       startsAt: new Date(y, m, 5, 19, 0),
    //       endsAt: new Date(y, m, 5, 22, 30)
    //   },
    //   {
    //       title: 'AngularJS Seminar',
    //       type: 'off-site-work',
    //       startsAt: new Date(y, m, 8, 10, 30),
    //       endsAt: new Date(y, m, 9, 18, 30)
    //   },
    //   {
    //       title: 'Event 1',
    //       type: 'job',
    //       startsAt: new Date(y, m, d - 5),
    //       endsAt: new Date(y, m, d - 2)
    //   },
    //   {
    //       title: 'Event 2',
    //       type: 'cancelled',
    //       startsAt: new Date(y, m, d - 3, 16, 0),
    //       endsAt: new Date(y, m, d - 3, 18, 0)
    //   },
    //   {
    //       title: 'This is a really long event title',
    //       type: 'to-do',
    //       startsAt: new Date(y, m, d + 1, 19, 0),
    //       endsAt: new Date(y, m, d + 1, 22, 30)
    //   },
    // ];

    $scope.calendarView = 'month';
    $scope.calendarDate = new Date();

    function showModal(action, event) {
        var modalInstance = $aside.open({
            templateUrl: 'calendarEvent.html',
            placement: 'right',
            size: 'sm',
            backdrop: true,
            controller: function($scope, $uibModalInstance) {
                $scope.$modalInstance = $uibModalInstance;
                $scope.action = action;
                $scope.event = event;
                $scope.cancel = function() {
                    $uibModalInstance.dismiss('cancel');
                };
                $scope.deleteEvent = function() {
                    $uibModalInstance.close($scope.event, $scope.event);
                };
                $scope.maxDate = new Date(2020, 5, 22);
                $scope.minDate = new Date(1970, 12, 31);

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

                $scope.endOpen = function() {
                    $scope.endOptions.minDate = $scope.event.startsAt;
                    $scope.startOpened = false;
                    $scope.endOpened = !$scope.endOpened;
                };

                $scope.startOpen = function() {
                    $scope.startOptions.maxDate = $scope.event.endsAt;
                    $scope.endOpened = false;
                    $scope.startOpened = !$scope.startOpened;
                };

            }
        });
        modalInstance.result.then(function(selectedEvent, action) {

            $scope.eventDeleted(selectedEvent);

        });
    }


    $scope.eventClicked = function(event) {
        showModal('Clicked', event);
    };
    $scope.addEvent = function() {
        $scope.events.push({
            title: 'New Event',
            startsAt: new Date(y, m, d, 10, 0),
            type: 'job'
        });
        $scope.eventEdited($scope.events[$scope.events.length - 1]);
    };

    $scope.eventEdited = function(event) {
        showModal('Edited', event);
    };

    $scope.eventDeleted = function(event) {

        SweetAlert.swal({
            title: "Are you sure?",
            text: "Your will not be able to recover this event!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel plx!",
            closeOnConfirm: false,
            closeOnCancel: false
        }, function(isConfirm) {
            if (isConfirm) {
                $scope.events.splice(event.$id, 1);
                SweetAlert.swal("Deleted!", "Event has been deleted.", "success");
            } else {
                SweetAlert.swal("Cancelled", "Event is safe :)", "error");
            }
        });
    };


    $scope.toggle = function($event, field, event) {
        $event.preventDefault();
        $event.stopPropagation();

        event[field] = !event[field];
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

    $scope.endOpen = function() {
        $scope.endOptions.minDate = $scope.event.startsAt;
        $scope.startOpened = false;
        $scope.endOpened = !$scope.endOpened;
    };

    $scope.startOpen = function() {
        $scope.startOptions.maxDate = $scope.event.endsAt;
        $scope.endOpened = false;
        $scope.startOpened = !$scope.startOpened;
    };

}]);