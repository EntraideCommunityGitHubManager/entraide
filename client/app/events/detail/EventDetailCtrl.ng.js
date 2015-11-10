angular.module('entraide').controller('EventDetailCtrl', function ($rootScope, $scope, $meteor, $stateParams) {

    if($stateParams.event && $stateParams.event._id){
        $scope.event = $meteor.object(Events, $stateParams.event._id, false);
    }

    $scope.closeSideBar = function(){
        $rootScope.$broadcast('anim-sidebar-toggle');
    }

});

