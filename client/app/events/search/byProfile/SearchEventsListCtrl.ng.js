angular.module('entraide').controller('SearchEventsListCtrl', function ($rootScope, $scope, $meteor, $state, SessionService, CollectionService, MapService) {

    $scope.loading = true;
    var options = {collectionOptions:{'department.code': SessionService.getUserProfile().department.code}, backend:true};

    CollectionService.subscribe('search-events', options).then(function(events) {
        $scope.events = events;
        $scope.map = MapService.getMap(SessionService.getUserProfile().department.location);
        $scope.loading = false;
    });

    $scope.eventClicked = function(marker, eventName, event) {
        $scope.$apply();
        $state.go("app.main.events.search.byProfile.detail", {"event" : event});
        $rootScope.$broadcast('event-detail', event);
    };

});

