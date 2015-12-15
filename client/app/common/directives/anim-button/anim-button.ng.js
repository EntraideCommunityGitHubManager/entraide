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
        },
        link: function (scope, element) {
            
            scope.animButtonSubType = scope.animButtonSubType ? scope.animButtonSubType : '1';
            //var cbutton = element[0].querySelector('.animButton');
            scope.clickHandler = function(e){
                scope.animButtonCallback();
            };
            
            scope.getClass = function(){
            	return scope.config[scope.animButtonType].class + ' ' + scope.config[scope.animButtonType][scope.animButtonSubType];
            };
                        
            scope.$on("$destroy", function () {});
        }
    };

});
