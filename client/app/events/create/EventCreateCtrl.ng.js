angular.module('entraide').controller('EventCreateCtrl', function ($rootScope, $scope, $meteor, $state, $stateParams, $timeout, CollectionService, AnimService, AnimToasterNotificationService) {

    $scope.event = $stateParams.event;
    
    CollectionService.subscribe('my-events').then(function(events){ 
        $scope.events = events;
        AnimService.stopTransition();
    }); 

    $scope.create = function(event){
        $meteor.call('event_create', event).then(function(){
            AnimToasterNotificationService.addSuccessMessage("L'évenement a été ajouté avec succès !");
            $state.go('app.main.events.search.myEvents');
            $timeout(function(){$rootScope.$broadcast('event-edit');},100);
        },function(err){$scope.error=err;});
    };
    
    $scope.close=function(){
        $rootScope.$broadcast('anim-sidebar-toggle');
    };

});

