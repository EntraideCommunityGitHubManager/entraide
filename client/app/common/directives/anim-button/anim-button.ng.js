angular.module('entraide').directive('animButton', function(){

    return {
        restrict: 'AEC',
        replace: true,
        scope: {
            animButtonIcon: '@',
            animButtonType: '@',
            animButtonSubType: '@'
            animButtonCallback: '&'
        },
        templateUrl: 'client/app/common/directives/anim-button/anim-button.ng.html',
        controller: function($scope){
            $scope.config = {
                
            };
            $scope.getAnimButtonClass = function(){
            	return $scope.config[$scope.animButtonType].class + ' ' + $scope.config[$scope.animButtonType][$scope.animButtonSubType];
            };
        },
        link: function (scope, element) {
            scope.animButtonType = scope.animButtonType ? scope.animButtonType : 'isi'
            scope.animButtonSubType = scope.animButtonSubType ? scope.animButtonSubType : '1';
            //var cbutton = element[0].querySelector('.animButton');
            scope.clickHandler = function(e){
                scope.animButtonCallback();
            };
                        
            scope.$on("$destroy", function () {});
        }
    };

});
