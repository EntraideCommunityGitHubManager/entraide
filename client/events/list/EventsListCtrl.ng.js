Events = new Mongo.Collection("events");

angular.module('entraide').controller('EventsListCtrl', function ($scope, $meteor) {

    console.log("main events list Ctrl");

    //$scope.events = $meteor.collection(Events).subscribe('events');

    $meteor.subscribe('events').then(function(subscriptionHandle) {



        $scope.events = $meteor.collection(Events);

        //subscriptionHandle.stop();

    });


});

