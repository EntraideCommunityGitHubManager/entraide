angular.module('entraide').controller('SearchEventsListCtrl', function ($rootScope, $scope, $meteor, $state, SessionService, CollectionService, MapService, AnimService) {

    var department = SessionService.getUserProfile().department;
    var options = {collectionOptions:{'department.code': department.code}, backend:true};

    CollectionService.subscribe('search-events', options).then(function(events) {
        $scope.events = events;
        $scope.map = MapService.getMap(department.location);
        AnimService.stopTransition();
    });

    $scope.eventClicked = function(marker, eventName, event) {
        $scope.$apply();
        $state.go("app.main.events.search.byProfile.detail", {"event" : event});
        $rootScope.$broadcast('event-detail', event);
    };

});

