angular.module('entraide').controller('HeaderCtrl', function ($scope, $rootScope, SecurityService, SessionService,  $meteor, $state, AnimService, CollectionService) {

    console.log("header-view Ctrl");

    $scope.isAdmin = SecurityService.isAdmin ;
    $scope.isConnected = SecurityService.isConnected;
    $scope.sessionService = SessionService;

    $scope.login = function(){
        $scope.error = null;
        SecurityService.loginWithPassword($scope.user.email, $scope.user.password).then(function () {
            logUser(loadProfileImage);
        }, function (err) { $scope.error = err; });
    };

    $scope.create = function(){
        $scope.error = null;
        SecurityService.createUser({ username:getUserName($scope.user.email), email:$scope.user.email, password: $scope.user.password}).then(function () {
            logUser(initUserDataAfterCreation);
        }, function (err) {$scope.error = err; });
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

    $scope.editProfile = function(){
        $rootScope.$broadcast('profile-edit');
    };

    var init = function(){
        $scope.user = {email:'', password:''};
        $scope.security = {oldPassword:null, newPassword:null};
        $scope.error = null;
        $scope.profileImage = null;
    };
    
    var logUser = function(callback){
        $rootScope.$broadcast('animLoginToggleEvent');
        setTimeout(function(){
            AnimService.startTransition();
            SessionService.setUserProfile($rootScope.currentUser, $rootScope.currentUser.department);
            callback();
            AnimService.stopTransition(2000);
        }, 1000);
    };
    
    var loadProfileImage = function(){
        var options = {collectionOptions:{'favorite': true}};
        CollectionService.subscribe('my-profile-images', options).then(function(images){
            SessionService.setUserProfileImage(images[0]);
        });
    };
    
    var initUserDataAfterCreation = function(){
        $meteor.call('initUserDataAfterCreation').then(function(){
            $state.reload();
        });
    };
    
    var getUserName = function(email){
        return email.indexOf('@')>0 ? email.substring(0,email.indexOf('@')) : email;
    };

    init();
    loadProfileImage();

});

