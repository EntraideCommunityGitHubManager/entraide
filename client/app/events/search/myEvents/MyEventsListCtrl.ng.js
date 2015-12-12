angular.module('entraide').controller('MyEventsListCtrl', function ($rootScope, $scope, $meteor, $state, CollectionService, MapService, SessionService, AnimService) {

    CollectionService.subscribe('my-events').then(function(events) {
        $scope.events = events;
        $scope.map = MapService.getMap(SessionService.getUserProfile().department.location);
        AnimService.stopTransition();
    });

    $scope.eventClicked = function(marker, eventName, event){
        $state.go("app.main.events.search.myEvents.edit", {"event" : event});
        $rootScope.$broadcast('event-edit', event);
    };

    $scope.$on('map-click', function(e, originalEventArgs) {
        $state.go("app.main.events.search.myEvents.create", {
            "event": {
                location: MapService.getCoord(originalEventArgs),
                department: SessionService.getUserProfile().department,
                owner: SessionService.getOwner()
            }
        });
        $rootScope.$broadcast('event-create', $scope.event);
    });

});

