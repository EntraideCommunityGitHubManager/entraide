angular.module('entraide').controller('EventEditCtrl', function ($rootScope, $scope, $meteor, $stateParams, $state, CollectionService, AnimService) {

    console.log('EventEditCtrl');

    if($stateParams.event && $stateParams.event._id) {
        $scope.event = $meteor.object(Events, $stateParams.event._id, false);
        AnimService.stopTransition();
    }

    $scope.update = function(event) {
        if(event._id) {
            event.save().then(function() {
                $rootScope.$broadcast('anim-sidebar-toggle');
            }, function(error){alert(error);});
        }
    };

    $scope.remove = function(event) {
        if(event._id) {
            CollectionService.subscribe('my-events').then(function(events) {
                events.remove(event);
                $rootScope.$broadcast('anim-sidebar-toggle');
            });
        }
    };

    $scope.close=function(){
        $rootScope.$broadcast('event-edit');
    };

    $scope.hasChanged = function(){
        return true;
    };

});