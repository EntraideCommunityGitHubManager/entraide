angular.module('entraide').controller('MyEventsListCtrl', function ($scope, $meteor, CollectionService) {

    console.log("my events list Ctrl");

    $scope.loading = true;
    //$meteor.subscribe('my-events').then(function(subscriptionHandler){
        //$scope.events = $meteor.collection(Events);
        //$scope.loading = false;
        //subscriptionHandler.stop();
    //});
    
    
    CollectionService.subscribe('my-events'). then(function(events) {
        $scope.events = events;
        $scope.loading = false;
    });
    

    $scope.remove = function(event){
        $scope.events.remove(event);
    }


});

