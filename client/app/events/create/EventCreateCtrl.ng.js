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
        $scope.error = null;
        if($scope.categoryFilter.categoriesSelected.length<=0){
            $scope.error ={reason:"Vous devez sélectionner au moins une catégorie."};
            return;
        }
        $meteor.call('event_create', event, $scope.categoryFilter.categoriesSelected[0].ancestors[0]).then(function(eventId){
            var skills = [];
            angular.forEach($scope.categoryFilter.categoriesSelected, function(cat){
                skills.push({eventId:eventId, categoryCode:cat.code, level: $scope.categoryFilter.categoriesSelectedRating[cat.code]});
            });
            $meteor.call('event_skill_create', eventId, skills).then(function(){
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

