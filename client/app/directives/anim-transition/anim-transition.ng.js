angular.module('entraide').directive('animTransition', function(){
    
    return {
        restrict: 'AEC',
        transclude: true,
        scope: {
            startEvent: '@',
            stopEvent : '@',
            animTransitionType: '@'
        },
        templateUrl: 'client/app/directives/anim-transition/anim-transition.ng.html',
        controller: function($scope){
            $scope.$on($scope.startEvent, function(){
                $scope.svgLoader ? $scope.svgLoader.show() : null;
            });
            $scope.$on($scope.stopEvent, function(){
                $scope.svgLoader ? $scope.svgLoader.hide() : null;
            });
        },
        compile: function(element, attrs) {
            var config = {
                'horizontal' : {
                  'open' : 'M 0,0 0,60 80,60 80,0 z M 80,0 40,30 0,60 40,30 z',
                  'close' : 'M 0,0 0,60 80,60 80,0 Z M 80,0 80,60 0,60 0,0 Z'
                },
                'parallelogram' : {
                    'open' : 'm -5,-5 0,70 90,0 0,-70 z m 5,35 c 0,0 15,20 40,0 25,-20 40,0 40,0 l 0,0 C 80,30 65,10 40,30 15,50 0,30 0,30 z',
                    'close' : 'm -5,-5 0,70 90,0 0,-70 z m 5,5 c 0,0 7.9843788,0 40,0 35,0 40,0 40,0 l 0,60 c 0,0 -3.944487,0 -40,0 -30,0 -40,0 -40,0 z'
                }    
            };
            attrs.animTransitionType = attrs.animTransitionType && attrs.animTransitionType.length>0 ? attrs.animTransitionType : 'parallelogram';
            var animation = config[attrs.animTransitionType] ? config[attrs.animTransitionType] : config['parallelogram'];
            
            var div = element[0].querySelector('.pageload-overlay'));
            div.setAttribute("data-opening", animation.open);
            var svg = element.find('svg')[0];
            var path = document.createElementNS("http://www.w3.org/2000/svg", 'path');
            path.setAttribute("d", animation.close);
            svg.appendChild(path);
            
            return function link(scope, element) {
                var overlay = element[0].querySelector('.pageload-overlay'));
                scope.svgLoader = new SVGLoader( overlay, { speedIn : 300, speedOut : 600, easingIn : mina.easeinout, easingOut : mina.bounce });
                    scope.$on("$destroy", function () {
                    console.log('anim-transition-destroy event');
                });
            };
        }
    };

});
