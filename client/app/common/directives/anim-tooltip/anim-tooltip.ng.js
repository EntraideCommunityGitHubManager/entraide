angular.module('entraide').directive('animTooltip', function(){

    return {
        restrict: 'AE',
        replace: true,
        scope: {
            animTooltipText: '@',
            animTooltipType: '@',
            animTooltipCallback: '&'
        },
        templateUrl: 'client/app/common/directives/anim-tooltip/anim-tooltip.ng.html',
        controller: function($scope){
         
        },
        link: function (scope, element) {
            scope.animTooltipType = scope.animTooltipType ? scope.animTooltipType : 'curved'
            //var cbutton = element[0].querySelector('.animTooltip');
            scope.clickHandler = function(){
                scope.animTooltipCallback();
            };
                        
            scope.$on("$destroy", function () {});
        }
    };

});
