
angular.module('entraide').controller('EventDetailCtrl', function ($scope, $meteor, $stateParams, $state, CollectionService) {

    console.log("side-content-view Ctrl : event edit");

    CollectionService.subscribe('my-events').then(function(){
        $scope.event = $meteor.object(Events, $stateParams.eventId, false);
    });

    $scope.update = function(event){
        event.save().then(function(){
            $state.go("app.main.events.search.myEvents");
        }, function(error){alert(error);});
    }

});

