angular.module('entraide').controller('EventDetailCtrl', function ($rootScope, $scope, $meteor, $stateParams, AnimService) {

    if($stateParams.event && $stateParams.event._id){
        $scope.event = $meteor.object(Events, $stateParams.event._id, false);
        AnimService.stopTransition();
    }

    $scope.close=function(){
        $rootScope.$broadcast('event-detail');
    };

});

