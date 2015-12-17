angular.module('entraide').controller('EventEditCtrl', function ($rootScope, $scope, $meteor, $stateParams, $state, CollectionService, AnimService, NotificationService) {

    console.log('EventEditCtrl');

    if($stateParams.event && $stateParams.event._id) {
        $scope.event = $meteor.object(Events, $stateParams.event._id, false);
        AnimService.stopTransition();
    }

    $scope.update = function(event) {
        $scope.error=null;
        $meteor.call('event_update', event).then(function(){
            $rootScope.$broadcast('anim-sidebar-toggle');
            NotificationService.addSuccessMessage("Enregistré avec succès !");
            console.log('event updated');
        },function(err){$scope.error=err;});
    };

    $scope.remove = function(event) {
        $scope.error=null;
        $meteor.call('event_remove', event._id).then(function(){
            $rootScope.$broadcast('anim-sidebar-toggle');
            console.log('event removed');
        },function(err){$scope.error=err;});
    };

    $scope.close=function(){
        $rootScope.$broadcast('anim-sidebar-toggle');
    };

    $scope.hasChanged = function(){
        return true;
    };

});
