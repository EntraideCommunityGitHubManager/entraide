angular.module('entraide').controller('HeaderCtrl', function ($scope, $rootScope, SecurityService, SessionService,  $meteor, $state, AnimService, CollectionService) {

    console.log("header-view Ctrl");

    $scope.isAdmin = SecurityService.isAdmin ;
    $scope.isConnected = SecurityService.isConnected;
    $scope.sessionService = SessionService;

    $scope.login = function(){
        $scope.error = null;
        $meteor.call('check_user', $scope.user.email, Package.sha.SHA256($scope.user.password)).then(function(){
            $rootScope.$broadcast('animLoginToggleEvent');
            AnimService.startTransition();
            setTimeout(function(){
                SecurityService.loginWithPassword($scope.user.email, $scope.user.password).then(function () {
                    SessionService.setUserProfile($rootScope.currentUser, $rootScope.currentUser.department);
                    loadProfileImage();
                    $state.go('app.main.events.search.myEvents');
                },function(err){$scope.error=err;});
                AnimService.stopTransition(2000); // not needed if we make a redirection
            }, 1000);
        },function(err){$scope.error=err;});
    };

    $scope.create = function(){
        $scope.error = null;
        SecurityService.createUser({ username:getUserName($scope.user.email), email:$scope.user.email, password: $scope.user.password}).then(function () {
            logUser(loadProfileImage);
        },function(err){$scope.error=err;});
    };

    $scope.logout = function(){
        AnimService.startTransition();
        SecurityService.logout().then(function(){
            $rootScope.$broadcast('side-left-close');
            SessionService.resetUserProfile();
            CollectionService.stopHandlers('my-');
            init();
            $state.go('app.main', {reload: true, inherit: true, notify: true});
            AnimService.stopTransition(3000);
        }, function(){$state.go('app.main.error');});
    };

    $scope.edit = function(){
        $rootScope.$broadcast('profile-edit');
    };

    var init = function(){
        $scope.user = {email:'', password:''};
        $scope.security = {oldPassword:null, newPassword:null};
        $scope.error = null;
        $scope.profileImage = null;
    };
    
    var logUser = function(callback){
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
    
    var getUserName = function(email){
        return email.indexOf('@')>0 ? email.substring(0,email.indexOf('@')) : email;
    };

    init();
    loadProfileImage();

});

