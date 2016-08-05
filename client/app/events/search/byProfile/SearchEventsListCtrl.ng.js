angular.module('entraide').controller('SearchEventsListCtrl', function ($rootScope, $scope, $meteor, $state, SecurityService, SessionService, CollectionService, MapService, AnimService) {

    var department = SessionService.getUserProfile().department;
    var options = {collectionOptions:{'department.code': department.code}, backend:true};

    $scope.isConnected = SecurityService.isConnected;

    CollectionService.subscribe('search-events', options).then(function(events) {
        angular.forEach(events, function(event){event.icon = event.icon ? event.icon : getIcon();});
        $scope.events = events;
        $scope.map = MapService.getMap(department.location);
        AnimService.stopTransition();
    });

    $scope.i=1;
    function getIcon(){
        $scope.i = $scope.i+1;
        return  $scope.i % 2 ? 'category/e-marker-pastel-blue.png' : 'category/e-marker-pink.png';
    }

    $scope.eventClicked = function(marker, eventName, event) {
        MapService.animate(marker, 'bounce');
        $state.go("app.main.events.search.byProfile.detail", {"event" : event});
        $rootScope.$broadcast('event-detail', event);
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

