angular.module('entraide').controller('EventCreateCtrl', function ($rootScope, $scope, $meteor, $state, $stateParams, CollectionService) {

    $scope.event = $stateParams.event;
    
    CollectionService.subscribe('my-events').then(function(events){ 
        $scope.events = events; 
    }); 

    $scope.create = function(event){
        $scope.events.push(event);
        $rootScope.$broadcast('anim-sidebar-toggle');
        $state.go("app.main.events.search.myEvents");
    };


});

