angular.module('entraide').controller('SideLeftCtrl', function ($rootScope, $scope, SecurityService) {

    console.log("side-left-view Ctrl");

    $scope.isOpen = false;
    $scope.isConnected = SecurityService.isConnected;
    $scope.currentView = null;

    $scope.toggleSidebar = function(state, view){toggle(state, view);};
    $scope.$on('event-search', function(){toggle(true, 'search');});
    $scope.$on('event-create', function(){toggle(true, 'event');});
    $scope.$on('event-edit', function(){toggle(true, 'event')});
    $scope.$on('event-detail', function(){toggle(true, 'event')});
    $scope.$on('profile-edit', function(){toggle(true, 'profile')});

    function toggle(open, currentView){
        if($scope.isOpen && open && $scope.currentView != currentView){

        } else if(!$scope.isOpen || ($scope.isOpen && $scope.currentView == currentView)){
            $scope.isOpen = !$scope.isOpen;
            $rootScope.$broadcast('anim-sidebar-toggle');
        }
        $scope.currentView = currentView;
    };
   
});
