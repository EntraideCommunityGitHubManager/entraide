angular.module('entraide').controller('MyEventsListCtrl', function ($rootScope, $scope, $meteor, CollectionService, MapService) {

    $scope.loading = true;
    CollectionService.subscribe('my-events'). then(function(events) {
        $scope.events = events;
        $scope.map = MapService.getMap();
        $scope.events.forEach(function(event) {
            event.eventClicked = function () {
                $rootScope.$broadcast('event-edit', event);
                $scope.$apply();
                console.log(event);
            };
        });
        $scope.loading = false;
    });

    $scope.$on('map-click', function(e, originalEventArgs) {
        $rootScope.$broadcast('event-create', MapService.getCoord(originalEventArgs));
        $scope.$apply();
    });

});

