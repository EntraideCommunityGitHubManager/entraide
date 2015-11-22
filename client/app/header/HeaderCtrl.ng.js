angular.module('entraide').controller('HeaderCtrl', function ($scope, $rootScope, SecurityService, SessionService,  $meteor, $state, AnimService, CollectionService) {

    console.log("header-view Ctrl");

    $scope.isAdmin = SecurityService.isAdmin ;
    $scope.isConnected = SecurityService.isConnected;

    $scope.user = {email:'', password:''};
    $scope.security = {oldPassword:null, newPassword:null};
    $scope.error = null;
    $scope.animLoginToggleEvent = 'animLoginToggleEvent';

    $scope.login = function(){
        $scope.error = null;
        SecurityService.loginWithPassword($scope.user.email, $scope.user.password).then(function () {
            $rootScope.$broadcast($scope.animLoginToggleEvent);
            setTimeout(function(){AnimService.startTransition();}, 1000);
            SessionService.setUserProfile($rootScope.currentUser, $rootScope.currentUser.department);
            AnimService.stopTransition(3000);
        }, function (err) {
            $scope.error = err;
        });
    };

    $scope.create = function(){
        SecurityService.createUser({
            username:$scope.user.email,
            email:$scope.user.email,
            password: $scope.user.password
        }).then(function () {
            SessionService.setUserProfile($rootScope.currentUser, $rootScope.currentUser.department);
            $state.reload();
        }, function (err) {
            $scope.error = err;
        });
    };

    $scope.edit = function(){
        console.log("edit profile called");
    };
    
    $scope.changePassword = function(){
        SecurityService.changePassword($scope.security.oldPassword, $scope.security.newPassword).then(function () {
            alert('Password changed.');
        }, function (err) {alert(err);$scope.error = err;});
    };

    $scope.logout = function(){
        AnimService.startTransition();
        SecurityService.logout().then(function(){
            SessionService.resetUserProfile();
            CollectionService.stopHandlers('users');
            $state.go('app.main', {reload: true, inherit: true, notify: true});
            AnimService.stopTransition(3000);
        }, function(){$state.go('app.main.error');});
    };

    $scope.openSidebar = function(){
        $rootScope.$broadcast('anim-sidebar-toggle');
    };

});

