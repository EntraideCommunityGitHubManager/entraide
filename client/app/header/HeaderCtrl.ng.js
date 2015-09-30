angular.module('entraide').controller('HeaderCtrl', function ($scope, $rootScope, SecurityService, $meteor, $state) {

    console.log("header-view Ctrl");

    $scope.isAdmin = SecurityService.isAdmin($rootScope.currentUser) !== true ? false : true ;
    $scope.isConnected = SecurityService.isConnected($rootScope.currentUser);

    $scope.user = {email:'', password:''};
    $scope.signInOpen = false;
    $scope.error = null;

    $scope.toggleSignIn = function(){
        $scope.signInOpen = !$scope.signInOpen;
    };

    $scope.signIn = function(){
        $scope.error = null;
        SecurityService.loginWithPassword($scope.user.email, $scope.user.password).then(function () {
                $scope.signInOpen = false;
                $state.reload();
            }, function (err) {$scope.error = err;}
        );
    };

    $scope.create = function(){
        SecurityService.createUser({
            username:$scope.user.email,
            email:$scope.user.email,
            password: $scope.user.password,
        }).then(function () {
                $scope.signInOpen = false;
                $state.reload();
            }, function (err) {$scope.error = err;}
        );
    };

    $scope.signOut = function(){
        SecurityService.logout().then(function(){
            $state.go('home', {}, {reload: true, inherit: true, notify: true});
        }, function(){$state.go('app.main.error');});
    };

});

