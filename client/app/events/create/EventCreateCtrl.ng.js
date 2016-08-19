angular.module('entraide').controller('EventCreateCtrl', function ($rootScope, $scope, $meteor, $state, $stateParams, $timeout, CollectionService, AnimService, MapService, AnimToasterNotificationService) {

    $scope.event = $stateParams.event;
    MapService.addMarker($scope.event.location);
    
    $scope.categoryFilter = { 
        filterTerm: "", 
        categories: [],
        categoriesDisplayed: [],
        categoriesSelected: [],
        categoriesSelectedRating: {}
    };
    
    CollectionService.subscribe('my-events').then(function(events){ 
        $scope.events = events;
        AnimService.stopTransition();
    });

    CollectionService.subscribe('all-categories').then(function(categories){
        $scope.categoryFilter.categories = categories;
    });

    $scope.create = function(event){
        $meteor.call('event_create', event).then(function(eventId){
            var skills = [];
            angular.forEach($scope.categoryFilter.categoriesSelected, function(cat){
                skills.push({eventId:eventId, categoryCode:cat.code, level: $scope.categoryFilter.categoriesSelectedRating[cat.code]});
            });
            $meteor.call('event_skill_create', skills).then(function(skillsId){
                MapService.removeAddedMarker();
                AnimToasterNotificationService.addSuccessMessage("L'évenement a été ajouté avec succès !");
                $state.go("app.main.events.search.myEvents.edit", {"event" : {_id: eventId}});
            },function(err){$scope.error=err;});  
        },function(err){$scope.error=err;});
    };

    $scope.$on('anim-side-bar-close', function(){
        setTimeout(function(){MapService.removeAddedMarker();}, 300);
    });
    
    $scope.close=function(){
        MapService.removeAddedMarker();
        $rootScope.$broadcast('anim-sidebar-toggle');
    };

});

