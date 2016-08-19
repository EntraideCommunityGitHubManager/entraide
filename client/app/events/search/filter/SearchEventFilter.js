angular.module('entraide').controller('SearchEventFilterCtrl', function ($rootScope, $scope, $meteor, $state, SessionService, CollectionService, SecurityService, SearchEventService) {

    console.log('SearchEventFilterCtrl');

    $scope.isConnected = SecurityService.isConnected;
    $scope.searchEventService = SearchEventService;
    
    CollectionService.subscribe('all-categories').then(function(categories){
        $scope.searchEventService.searchEventFilter.categories = categories;
    }, function(err){console.log(err);});

    $scope.search = function(param){
        $rootScope.$broadcast('search-events-event', param);
    };

    $scope.goTo = function(state){
        $state.go(state);
    };

});

