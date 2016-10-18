angular.module('entraide').controller('HeaderCtrl', function ($scope, $rootScope, SecurityService, SessionService,  $meteor, $state, AnimService, CollectionService, MapService) {

    console.log("header-view Ctrl");

    $scope.isAdmin = SecurityService.isAdmin ;
    $scope.isConnected = SecurityService.isConnected;
    $scope.isBurgerVisible = function(){return $state.current.name == 'app.main' || $state.current.name.indexOf('app.main.error')>-1;};
    $scope.sessionService = SessionService;

    $scope.login = function(){
        $scope.error = null;
        $meteor.call('check_user', $scope.user.email, Package.sha.SHA256($scope.user.password)).then(function(){
            logUser();
        },function(err){$scope.error=err;});
    };

    $scope.create = function(){
        $scope.error = {reason:''};
        SecurityService.createUser({ username:getUserName($scope.user.email.toLowerCase()), email:$scope.user.email.toLowerCase(), password: $scope.user.password}).then(function () {
            $meteor.call('init_user_profile', SessionService.getUserProfile().department.code).then(function(){console.log('init_user_profile success');},function(err){$scope.error=err;});
            logUser();
        },function(err){
            if(err.reason.toLowerCase().indexOf('username already exists')>-1){
                $scope.error.reason = "Ce nom est déjà pris : ("
            } else if(err.message.toLowerCase().indexOf('email already exists')>-1){
                $scope.error.reason = "Cet email est déjà pris : ("
            } else {
                $scope.error=err;
            }
        });
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

    $scope.$on('logout', $scope.logout);

    $scope.search = function(){
        $rootScope.$broadcast('event-search');
    };

    $scope.edit = function(){
        $rootScope.$broadcast('profile-edit');
    };

    var init = function(){
        $scope.user = {email:'', password:''};
        $scope.security = {oldPassword:null, newPassword:null};
        $scope.error = null;
        $scope.profileImage = null;
        MapService.resetCurrentMapStyle();
    };
    
    var logUser = function(){
        $rootScope.$broadcast('animLoginToggleEvent');
        AnimService.startTransition();
        setTimeout(function(){
            SecurityService.loginWithPassword($scope.user.email, $scope.user.password).then(function () {
                SessionService.setUserProfile($rootScope.currentUser, $rootScope.currentUser.department);
                loadProfileData();
                $state.go('app.main.events.search.byProfile');
            },function(err){$scope.error=err;});
            AnimService.stopTransition(2000); // not needed if we make a redirection
        }, 1000);
    };
    
    var loadProfileData = function(){
        var options = {collectionOptions:{'favorite': true}};
        CollectionService.subscribe('my-profile-images', options).then(function(images){
            SessionService.setUserProfileImage(images[0]);
        });
        CollectionService.subscribe('my-profile').then(function(profiles){
            if(profiles[0]){
                MapService.setCurrentMapStyle(profiles[0].mapStyle);
            }
        });
    };
    
    var getUserName = function(email){
        return email.indexOf('@')>0 ? email.substring(0,email.indexOf('@')) : email;
    };

    init();
    loadProfileData();

});

