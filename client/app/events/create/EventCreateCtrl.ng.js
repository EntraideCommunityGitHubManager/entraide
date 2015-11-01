angular.module('entraide').controller('EventCreateCtrl', function ($rootScope, $scope, $meteor, $state, $stateParams, CollectionService, SessionService) {

    $scope.event = $stateParams.event;

    $scope.create = function(event){
        event.owner= {id:$scope.$root.currentUser._id};
        CollectionService.subscribe('my-events').then(function(events){
            events.push(event);
            $rootScope.$broadcast('anim-sidebar-toggle');
            $state.go("app.main.events.search.myEvents");
        });
    }

});

