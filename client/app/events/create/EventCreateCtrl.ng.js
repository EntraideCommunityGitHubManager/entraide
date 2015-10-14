angular.module('entraide').controller('EventCreateCtrl', function ($scope, $meteor, $state, CollectionService, SessionService) {

    CollectionService.subscribe('my-events').then(function(events){
        $scope.events = events;
    });

    $scope.event = {
        location: {longitude:0, latitude:0},
        region: SessionService.getUserProfile().region,
        owner: {id:$scope.$root.currentUser._id}
    }

    $scope.create = function(event){
        event.owner= {id:$scope.$root.currentUser._id};
        $scope.events.push(event);
        $state.go("app.main.events.search.myEvents");
    }

});

