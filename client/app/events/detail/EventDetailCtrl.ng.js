angular.module('entraide').controller('EventDetailCtrl', function ($scope, $meteor, $stateParams) {

    if($stateParams.event && $stateParams.event._id){
        $scope.event = $meteor.object(Events, $stateParams.event._id, false);
    }

});

