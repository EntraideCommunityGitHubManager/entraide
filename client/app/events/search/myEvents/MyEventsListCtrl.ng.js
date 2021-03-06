angular.module('entraide').controller('MyEventsListCtrl', function ($rootScope, $scope, $meteor, $state, CollectionService, MapService, SessionService, AnimService, SecurityService, uiGmapGoogleMapApi) {

    $scope.isConnected = SecurityService.isConnected;

    CollectionService.subscribe('my-events').then(function(events) {
        $scope.events = events;
        $scope.map = MapService.getMap(SessionService.getUserProfile().department.location);
        AnimService.stopTransition();
    });

    $scope.eventClicked = function(marker, eventName, event){
        MapService.animate(marker, 'bounce');
        $state.go("app.main.events.search.myEvents.edit", {event:event});
        $rootScope.$broadcast('event-edit');
    };

    $scope.$on('map-click', function(e, originalEventArgs) {
        $state.go("app.main.events.search.myEvents.create", {
            "event": {
                location: MapService.getCoord(originalEventArgs),
                department: SessionService.getUserProfile().department,
                owner: SessionService.getOwner()
            }
        });
        $rootScope.$broadcast('event-create');
    });

    $scope.goTo = function(state){
        $state.go(state);
    };

    $scope.$on('marker-mouseover', function(e, marker){
        console.log('mouseover');
        console.log(arguments);
    });

    $scope.$on('marker-mouseout', function(e, marker){
        console.log('mouseout');
        console.log(arguments);
    });

});

