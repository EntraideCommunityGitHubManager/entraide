angular.module('entraide').directive('animClick', function(){

    return {
        restrict: 'AEC',
        scope: {
            model: '='
        },
        templateUrl: 'client/app/common/directives/anim-login/anim-login.ng.html',
        controller: function($scope){
            
        },
        link: function (scope, element) {

            scope.$on("$destroy", function () {});
        }
    };

});
