angular.module('entraide').controller('SideLeftCtrl', function ($rootScope, $scope, SecurityService) {
    console.log("side-left-view Ctrl");

    $scope.isConnected = SecurityService.isConnected($rootScope.currentUser);

    $scope.openSidebar = function(){
        $rootScope.$broadcast('anim-sidebar-on');
    };
});

