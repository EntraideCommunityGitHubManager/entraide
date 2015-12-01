angular.module('entraide').controller('HeaderCtrl', function ($scope, $rootScope, SecurityService, SessionService,  $meteor, $state, AnimService, CollectionService) {

    console.log("header-view Ctrl");

    $scope.isAdmin = SecurityService.isAdmin ;
    $scope.isConnected = SecurityService.isConnected;
    $scope.animLoginToggleEvent = 'animLoginToggleEvent';

    init();
    loadProfileImage()

    $scope.login = function(){
        $scope.error = null;
        SecurityService.loginWithPassword($scope.user.email, $scope.user.password).then(function () {
            logUser(loadProfileImage);
        }, function (err) { $scope.error = err; });
    };

    $scope.create = function(){
        $scope.error = null;
        SecurityService.createUser({ username:$scope.user.email.substring(0,$scope.user.email.indexOf('@')), email:$scope.user.email, password: $scope.user.password}).then(function () {
            logUser(initUserDataAfterCreation);
        }, function (err) {$scope.error = err; });
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
            CollectionService.stopHandlers('my-');
            init();
            $state.go('app.main', {reload: true, inherit: true, notify: true});
            AnimService.stopTransition(3000);
        }, function(){$state.go('app.main.error');});
    };
    
    $scope.openSidebar = function(){
        $rootScope.$broadcast('anim-sidebar-toggle');
    };

    var init = function(){
        $scope.user = {email:'', password:''};
        $scope.security = {oldPassword:null, newPassword:null};
        $scope.error = null;
        $scope.profileImage = null;
    }
    
    var logUser = function(callback){
        $rootScope.$broadcast($scope.animLoginToggleEvent);
        setTimeout(function(){
            AnimService.startTransition();
            SessionService.setUserProfile($rootScope.currentUser, $rootScope.currentUser.department);
            callback();
            AnimService.stopTransition(2000);
        }, 1000);
    }
    
    var loadProfileImage = function(){
        CollectionService.subscribe('my-profile-images').then(function(images){
            $scope.profileImage = images[0];
        });
    }
    
    var initUserDataAfterCreation = function(){
        $meteor.call('initUserDataAfterCreation').then(function(){
            $state.reload();
        });
    }
});

