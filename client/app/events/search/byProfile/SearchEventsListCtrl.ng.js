angular.module('entraide').controller('SearchEventsListCtrl', function ($rootScope, $scope, $meteor, $state, SecurityService, SessionService, SearchEventService, MapService, AnimService) {

    $scope.isConnected = SecurityService.isConnected;
    var department = SessionService.getUserProfile().department;
    
    SearchEventService.searchEvents().then(function(){
        $scope.events = events;
        $scope.map = MapService.getMap(department.location);
        AnimService.stopTransition();
    });
        
    $scope.$on('search-events-event', function(filter){
        SearchEventService.searchEvents(filter).then(function(){
            $scope.events = events;
        });
    });

    $scope.eventClicked = function(marker, eventName, event) {
        MapService.animate(marker, 'bounce');
        $state.go("app.main.events.search.byProfile.detail", {event:event});
        $rootScope.$broadcast('event-detail');
    };

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

