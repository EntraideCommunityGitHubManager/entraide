angular.module('entraide').controller('SearchEventsListCtrl', function ($scope, $meteor, CollectionService) {

    console.log("main events search Ctrl");

    $scope.loading = true;
    var options = {collectionOptions:{'region.id':1}, backend:true};
    CollectionService.subscribe('search-events', options).then(function(events) {
        $scope.events = events;
        $scope.loading = false;
    });


});

