angular.module('entraide').controller('SideLeftCtrl', function ($rootScope, $scope, SecurityService) {

    console.log("side-left-view Ctrl");

    $scope.isOpen = false;
    $scope.isConnected = SecurityService.isConnected;
    $scope.currentView = 'event-search';

    $scope.toggleSidebar = function(){toggle();};
    $scope.$on('event-search', function(){toggle(true, 'event-search');});
    $scope.$on('event-create', function(){toggle(true, 'event-create');});
    $scope.$on('event-edit', function(){toggle(true, 'event-edit')});
    $scope.$on('event-detail', function(){toggle(true, 'event-detail')});
    $scope.$on('profile-edit', function(){toggle(true, 'profile-edit')});

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
