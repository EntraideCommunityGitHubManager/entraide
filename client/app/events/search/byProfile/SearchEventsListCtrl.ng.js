angular.module('entraide').controller('SearchEventsListCtrl', function ($rootScope, $scope, $meteor, $state, SecurityService, SessionService, CollectionService, MapService, AnimService) {

    var department = SessionService.getUserProfile().department;
    var options = {collectionOptions:{'department.code': department.code}, backend:true};

    $scope.isConnected = SecurityService.isConnected;

    CollectionService.subscribe('search-events', options).then(function(events) {
        $scope.events = events;
        $scope.map = MapService.getMap(department.location);
        AnimService.stopTransition();
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

