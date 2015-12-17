angular.module('entraide').directive('animToaster', function(){

    return {
        restrict: 'AEC',
        replace: true,
        templateUrl: 'client/app/common/directives/anim-toaster/anim-toaster.ng.html',
        controller: function($scope){
           
        },
        link: function (scope, element) {
            scope.$on("$destroy", function () {});
        }
    };

});
