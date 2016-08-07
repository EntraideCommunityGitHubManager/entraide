angular.module('entraide').directive('animButtonMaterial', function(){

    return {
        restrict: 'AE',
        replace: true,
        scope: {
            animButtonMaterialText: '@',
            animButtonMaterialLeftIcon: '@',
            animButtonMaterialRightIcon: '@',
            animButtonMaterialDisabled: '=',
			animButtonMaterialCallback: '&'
        },
        templateUrl: 'client/app/common/directives/anim-button-material/anim-button-material.ng.html',
        controller: function($scope){
            $scope.clickHandler = function(){
                $scope.animButtonMaterialCallback();
            };
        },
        link: function (scope) {
            scope.$on("$destroy", function () {});
        }
    };

});
