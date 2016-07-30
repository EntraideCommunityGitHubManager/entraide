angular.module('entraide').controller('EventCreateCtrl', function ($rootScope, $scope, $meteor, $state, $stateParams, $timeout, CollectionService, AnimService, AnimToasterNotificationService) {

    $scope.event = $stateParams.event;

    $scope.selectedCategory = null;
    
    CollectionService.subscribe('my-events').then(function(events){ 
        $scope.events = events;
        AnimService.stopTransition();
    });

    CollectionService.subscribe('all-categories').then(function(categories){
        $scope.categories = categories;
    });

    $scope.create = function(event){
        event.icon = 'category/music-elec-drum/music-elec-drum.png';
        $meteor.call('event_create', event).then(function(id){
            AnimToasterNotificationService.addSuccessMessage("L'évenement a été ajouté avec succès !");
            $state.go("app.main.events.search.myEvents.edit", {"event" : {_id: id}});
        },function(err){$scope.error=err;});
    };
    
    $scope.close=function(){
        $rootScope.$broadcast('anim-sidebar-toggle');
    };

});

