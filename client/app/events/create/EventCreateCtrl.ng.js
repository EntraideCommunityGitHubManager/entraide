angular.module('entraide').controller('EventCreateCtrl', function ($rootScope, $scope, $meteor, $state, $stateParams, CollectionService, AnimService) {

    $scope.event = $stateParams.event;
    
    CollectionService.subscribe('my-events').then(function(events){ 
        $scope.events = events;
        AnimService.stopTransition();
    }); 

    $scope.create = function(event){
        $meteor.call('event_create', event).then(function(){console.log('event created');},function(err){$scope.error=err;});
        $rootScope.$broadcast('event-create');
    };

    $scope.close=function(){
        $rootScope.$broadcast('event-create');
    };

});

