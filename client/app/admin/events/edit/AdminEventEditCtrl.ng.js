angular.module('entraide').controller('AdminEventEditCtrl', function ($scope, $meteor, $stateParams, $state, CollectionService) {

    CollectionService.subscribe('all-events').then(function(events){
        $scope.events = events;
        $scope.event = $meteor.object(Events, $stateParams.eventId, false);
    });

    $scope.update = function(event){
        event.save().then(function(){$scope.back();},function(error){alert(error);});
    };

    $scope.remove = function(event){
        $scope.events.remove(event).then(function(){$scope.back();},function(err){alert(err);});
    };

    $scope.back = function(){
        $state.go('app.main.admin.events.all');
    };

    $scope.hasChanged = function(){
        return true;
    };

});

