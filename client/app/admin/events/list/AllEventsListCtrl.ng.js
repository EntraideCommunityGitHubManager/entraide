angular.module('entraide').controller('AllEventsListCtrl', function ($scope, $meteor, CollectionService) {

    $scope.loading = true;
    var options = {collectionOptions:{}, backend:true};
    CollectionService.subscribe('all-events', options).then(function(events) {
        $scope.events = events;
        $scope.loading = false;
    });

    $scope.remove = function(event){
        $scope.events.remove(event);
    }


});

