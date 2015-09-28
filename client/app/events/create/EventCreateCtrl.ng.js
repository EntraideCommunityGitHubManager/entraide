angular.module('entraide').controller('EventCreateCtrl', function ($scope, $meteor) {

    console.log("Event create Ctrl : event create");

    $scope.events = $meteor.collection(MyEvents).subscribe('myevents');

    $scope.create = function(event){
        event.owner={_id:$scope.$root.currentUser._id};
        $scope.events.push(event);
    }



});

