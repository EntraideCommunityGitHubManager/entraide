angular.module('entraide').controller('EventCreateCtrl', function ($rootScope, $scope, $meteor, $state, $stateParams, $timeout, CollectionService, AnimService, AnimToasterNotificationService) {

    $scope.event = $stateParams.event;
    
    CollectionService.subscribe('my-events').then(function(events){ 
        $scope.events = events;
        AnimService.stopTransition();
    }); 

    $scope.create = function(event){
        $meteor.call('event_create', event).then(function(id){
            AnimToasterNotificationService.addSuccessMessage("L'évenement a été ajouté avec succès !");
            $state.go("app.main.events.search.myEvents.edit", {"event" : {_id: id}});
        },function(err){$scope.error=err;});
    };
    
    $scope.close=function(){
        $rootScope.$broadcast('anim-sidebar-toggle');
    };

});

