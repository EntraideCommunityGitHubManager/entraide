angular.module('entraide').controller('EventEditCtrl', function ($rootScope, $scope, $meteor, $stateParams, $state, CollectionService) {

    if($stateParams.event && $stateParams.event._id) {
        $scope.event = $meteor.object(Events, $stateParams.event._id, false);
    }

    $scope.update = function(event) {
        if(event._id) {
            event.save().then(function() {
                $rootScope.$broadcast('anim-sidebar-toggle');
                $state.go("app.main.events.search.myEvents");
            }, function(error){alert(error);});
        }
    };

    $scope.remove = function(event) {
        if(event._id) {
            CollectionService.subscribe('my-events').then(function(events) {
                events.remove(event);
                $rootScope.$broadcast('anim-sidebar-toggle');
                $state.go("app.main.events.search.myEvents");
            });
        }
    };

    $scope.hasChanged = function(){
        return true;
    };

});

