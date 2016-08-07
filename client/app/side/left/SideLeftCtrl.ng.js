angular.module('entraide').controller('SideLeftCtrl', function ($rootScope, $scope, $state, SecurityService, AnimSidebarService, MapService) {

    console.log("side-left-view Ctrl");
    
    $scope.isConnected = SecurityService.isConnected;
    $scope.currentView = null;

    $scope.toggleSidebar = function(state, view){toggle(state, view);};
    $scope.$on('event-search', function(){toggle(true, 'search');});
    $scope.$on('event-create', function(){toggle(true, 'event');});
    $scope.$on('event-edit', function(){toggle(true, 'event')});
    $scope.$on('event-detail', function(){toggle(true, 'event')});
    $scope.$on('profile-edit', function(){toggle(true, 'profile')});

    $scope.$on('side-left-close', function(){
        if(AnimSidebarService.open){
            $scope.currentView=null;
            $rootScope.$broadcast('anim-sidebar-toggle');
        }
    });

    function toggle(open, currentView){
        if(AnimSidebarService.open && open && $scope.currentView != currentView){

        } else if(!AnimSidebarService.open || (AnimSidebarService.open && $scope.currentView == currentView)){
            $rootScope.$broadcast('anim-sidebar-toggle');
        }
        $scope.currentView = currentView;
    };
    
    $scope.isProfileActive = function(){
        return SecurityService.isConnected();
    };

    $scope.isSearchActive = function(){
        return !($state.is('app') || $state.is('app.main') || $state.current.name.indexOf('app.main.error')>-1) ;
    };

    $scope.isView = function(view){
        return view == $scope.currentView;
    };

});
