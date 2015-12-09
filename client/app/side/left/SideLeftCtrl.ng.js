angular.module('entraide').controller('SideLeftCtrl', function ($rootScope, $scope, SecurityService) {

    console.log("side-left-view Ctrl");

    $scope.isOpen = false;
    $scope.isConnected = SecurityService.isConnected;
    $scope.currentView = 'search';

    $scope.toggleSidebar = function(){toggle();};
    $scope.$on('event-search', function(){toggle(true, 'search');});
    $scope.$on('event-create', function(){toggle(true, 'event');});
    $scope.$on('event-edit', function(){toggle(true, 'event')});
    $scope.$on('event-detail', function(){toggle(true, 'event')});
    $scope.$on('profile-edit', function(){toggle(true, 'profile')});

    function toggle(open, currentView){
        var state = $scope.isOpen ? true : false;
        $scope.currentView = currentView;
        $scope.isOpen = open ? true : !$scope.isOpen;
        if(state != $scope.isOpen){
            $rootScope.$broadcast('anim-sidebar-toggle');
        }
    };
    
    $scope.isView = function(view){
        return view == $scope.currentView;
    }

});
