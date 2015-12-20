angular.module('entraide').controller('SearchEventsListCtrl', function ($rootScope, $scope, $meteor, $state, SessionService, CollectionService, MapService, AnimService) {

    var department = SessionService.getUserProfile().department;
    var options = {collectionOptions:{'department.code': department.code}, backend:true};

    CollectionService.subscribe('search-events', options).then(function(events) {
        angular.forEach(events, function(event){event.icon = getIcon();});
        $scope.events = events;
        $scope.map = MapService.getMap(department.location);
        AnimService.stopTransition();
    });

    $scope.i=1;
    function getIcon(){
        $scope.i = $scope.i+1;
        return  $scope.i % 2 ? 'category/music_rock.png' : 'category/music_classical_white.png';
    }

    $scope.eventClicked = function(marker, eventName, event) {
        MapService.animate(marker, 'bounce');
        $state.go("app.main.events.search.byProfile.detail", {"event" : event});
        $rootScope.$broadcast('event-detail', event);
    };

});

