angular.module('entraide').controller('SideLeftCtrl', function ($rootScope, $scope, SecurityService) {

    console.log("side-left-view Ctrl");

    $scope.isOpen = false;
    $scope.isConnected = SecurityService.isConnected();

    $scope.toggleSidebar = function(){toggle();};
    $scope.$on('event-create', function(){toggle(true);});
    $scope.$on('event-edit', function(){toggle(true)});
    $scope.$on('event-detail', function(){toggle(true)});
    $scope.$on('user-edit', function(){toggle(true)});

    function toggle(open){
        open ? $scope.isOpen = true : $scope.isOpen = !$scope.isOpen;
        $rootScope.$broadcast('anim-sidebar-toggle');
    };

});

