angular.module('entraide').controller('MyEventsListCtrl', function ($scope, $meteor) {

    console.log("my events list Ctrl");

    //$scope.events = $meteor.collection(MyEvents).subscribe('myevents');

    $meteor.subscribe('myevents').then(function(subscriptionHandle) {

        $scope.events = $meteor.collection(MyEvents);

    });


});

