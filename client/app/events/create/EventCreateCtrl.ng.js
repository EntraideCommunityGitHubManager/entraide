angular.module('entraide').controller('EventCreateCtrl', function ($scope, $meteor, $state) {

    console.log("Event create Ctrl : event create");

    $scope.events = $meteor.collection(Events).subscribe('my-events');

    $scope.create = function(event){
        event.owner={id:$scope.$root.currentUser._id};
        event.region={id:1};
        $scope.events.push(event);
        $state.go("app.main.events.search.myEvents");
    }

});

