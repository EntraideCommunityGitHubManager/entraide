angular.module('entraide').controller('EventCreateCtrl', function ($scope, $meteor, $state, CollectionService) {

    CollectionService.subscribe('my-events').then(function(events){
        $scope.events = events;
    });

    $scope.create = function(event){
        event.owner={id:$scope.$root.currentUser._id};
        event.region={id:1};
        $scope.events.push(event);
        $state.go("app.main.events.search.myEvents");
    }

});

