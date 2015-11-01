angular.module('entraide').controller('EventDetailCtrl', function ($scope, $meteor, $stateParams, $state, CollectionService) {

    CollectionService.subscribe('my-events').then(function() {
        $scope.event = $meteor.object(Events, $stateParams.eventId, false);
        $scope.backup = angular.copy($scope.event);
    });

    $scope.update = function(event){
        event.save().then(function(){
            $state.go("app.main.events.search.myEvents");
        }, function(error){alert(error);});
    };

    $scope.hasChanged = function(){
        return $scope.event != $scope.backup;
    };

});

