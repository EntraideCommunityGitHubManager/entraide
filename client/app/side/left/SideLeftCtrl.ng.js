angular.module('entraide').controller('SideLeftCtrl', function ($rootScope, $scope, SecurityService) {
    console.log("side-left-view Ctrl");

    $scope.eventCreate = false;
    $scope.eventEdit = false;
    $scope.eventDetail = false;
    $scope.userEdit = false;
    $scope.isOpen = false;

    $scope.isConnected = SecurityService.isConnected($rootScope.currentUser);
    $scope.toggleSidebar = function(){
        $rootScope.$broadcast('anim-sidebar-toggle');
        $scope.isOpen = !$scope.isOpen;
    };


    $scope.$on('event-create', function(e, location){
        $scope.event = {location: location};
        $scope.eventCreate = true;
        $scope.eventEdit = false;
        $scope.eventDetail = false;
        $scope.userEdit = false;
        $scope.isOpen = true;
        $rootScope.$broadcast('anim-sidebar-toggle');
    });

    $scope.$on('event-edit', function(e, event){
        $scope.event = event;
        $scope.eventCreate = false;
        $scope.eventEdit = true;
        $scope.eventDetail = false;
        $scope.userEdit = false;
        $scope.isOpen = true;
        $rootScope.$broadcast('anim-sidebar-toggle');
    });

    $scope.$on('event-detail', function(e, event){
        $scope.event = event;
        $scope.eventCreate = false;
        $scope.eventEdit = false;
        $scope.eventDetail = true;
        $scope.userEdit = false;
        $scope.isOpen = true;
        $rootScope.$broadcast('anim-sidebar-toggle');
    });

    $scope.$on('user-edit', function(e, user){
        $scope.user = user;
        $scope.eventCreate = false;
        $scope.eventEdit = false;
        $scope.eventDetail = false;
        $scope.userEdit = true;
        $scope.isOpen = true;
        $rootScope.$broadcast('anim-sidebar-toggle');
    });

});

