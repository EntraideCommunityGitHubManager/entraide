Events = new Mongo.Collection("events");

angular.module('entraide').controller('EventsListCtrl', function ($scope, $meteor) {

    $scope.events = $meteor.collection(Events).subscribe('events');

});

