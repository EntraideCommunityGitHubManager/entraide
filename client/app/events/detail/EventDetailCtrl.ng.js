
angular.module('entraide').controller('EventDetailCtrl', function ($scope, $meteor, $stateParams, $state) {

    console.log("side-content-view Ctrl : event edit");

    $scope.event = $meteor.object(Events, $stateParams.eventId, false);

    $meteor.subscribe('my-events');

    $scope.update = function(event){
        event.save().then(function(){
            $state.go("app.main.events.search.myEvents");
        }, function(error){alert(error);});
    }

});

