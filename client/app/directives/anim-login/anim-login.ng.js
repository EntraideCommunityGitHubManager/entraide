angular.module('entraide').directive('animLogin', function(){

    return {
        restrict: 'AEC',
        scope: {
            model: '=',
            titleLogin: '@',
            titleCreate: '@',
            error: '=',
            isConnected: '=',
            loginCallback: '&',
            createCallback: '&',
            logoutCallback: '&'
        },
        templateUrl: 'client/app/directives/anim-login/anim-login.ng.html',
        controller: function($scope){
            $scope.login = function(){
                $scope.loginCallback();
            };

            $scope.create = function(){
                $scope.createCallback();
            };

            $scope.logout = function(){
                $scope.logoutCallback();
            };
        },
        link: function (scope, element) {
            scope.$on("$destroy", function () {

            });
        }
    };

});