angular.module('entraide').controller('AdminEventListCtrl', function ($scope, $meteor, CollectionService) {

    CollectionService.subscribe('all-events').then(function(events) {
        $scope.events = events;
    });

    $scope.remove = function(event){
        $scope.events.remove(event).then(function(){
            AnimToasterNotificationService.addSuccessMessage("The event has been succcesfully removed.");
        },function(error){
            AnimToasterNotificationService.addErrorMessage("Error : " error.reason);
        });
    };

});

