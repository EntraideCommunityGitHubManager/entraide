angular.module('entraide').controller('EventCreateCtrl', function ($rootScope, $scope, $meteor, $state, $stateParams, CollectionService) {

    $scope.event = $stateParams.event;

    $scope.create = function(event){
        CollectionService.subscribe('my-events').then(function(events){
            events.push(event);
            $rootScope.$broadcast('anim-sidebar-toggle');
            $state.go("app.main.events.search.myEvents");
        });
    }

});

