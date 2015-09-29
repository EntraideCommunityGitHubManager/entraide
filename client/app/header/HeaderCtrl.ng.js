angular.module('entraide').controller('HeaderCtrl', function ($scope, $rootScope, SecurityService) {
    console.log("header-view Ctrl");
    $scope.isAdmin = SecurityService.isAdmin($rootScope.currentUser) !== true ? false : true ;
    $scope.isConnected = SecurityService.isConnected($rootScope.currentUser);
});

