angular.module('entraide').controller('AdminEventEditCtrl', function ($scope, $meteor, $stateParams, $state, CollectionService, AnimToasterNotificationService) {

    CollectionService.subscribe('all-events').then(function(events){
        $scope.events = events;
        $scope.event = $meteor.object(Events, $stateParams.eventId, false);
    });

    $scope.update = function(event){
        event.save().then(function(){
            AnimToasterNotificationService.addSuccessMessage("The event has been successfully updated.");
            $scope.back();
        },function(error){
            AnimToasterNotificationService.addErrorMessage("Error : " + error.reason);
        });
    };

    $scope.remove = function(event){
        $scope.events.remove(event).then(function(){
            AnimToasterNotificationService.addSuccessMessage("The event has been succcesfully deleted.");
            $scope.back();
        },function(error){
            AnimToasterNotificationService.addErrorMessage("Error : " + error.reason);
        });
    };

    $scope.back = function(){
        $state.go('app.main.admin.events.all');
    };

    $scope.hasChanged = function(){
        return true;
    };

});

