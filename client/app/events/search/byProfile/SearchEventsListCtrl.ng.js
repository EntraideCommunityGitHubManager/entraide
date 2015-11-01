angular.module('entraide').controller('SearchEventsListCtrl', function ($rootScope, $scope, $meteor, SessionService, CollectionService, MapService) {

    $scope.loading = true;

    var options = {collectionOptions:{'region.code':SessionService.getUserProfile().region.code}, backend:true};
    CollectionService.subscribe('search-events', options).then(function(events) {
        $scope.events = events;
        $scope.events.forEach( function (event) {event.eventClicked = function () {$rootScope.$broadcast('event-detail', event);$scope.$apply();console.log(event);};});
        $scope.map = MapService.getMap();
        $scope.loading = false;
    });

});

