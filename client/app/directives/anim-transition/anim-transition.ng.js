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
                'blind' : {
                    'open' : 'M 0,60 80,60 80,50 0,40 0,60;M 0,60 80,60 80,25 0,40 0,60;M 0,60 80,60 80,25 0,10 0,60;M 0,60 80,60 80,0 0,0 0,60',
                    'close': 'M 0,60 80,60 80,20 0,0 0,60;M 0,60 80,60 80,20 0,40 0,60;m 0,60 80,0 0,0 -80,0',
                    'path' : 'm 0,60 80,0 0,0 -80,0'
                },
                'circle' : {
                    'open' : 'M 40 -21.875 C 11.356078 -21.875 -11.875 1.3560784 -11.875 30 C -11.875 58.643922 11.356078 81.875 40 81.875 C 68.643922 81.875 91.875 58.643922 91.875 30 C 91.875 1.3560784 68.643922 -21.875 40 -21.875 Z',
                    'close' : null,
                    'path' : 'M40,30 c 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 Z'
                },
                'curtain' : {
                    'open' : 'm 40,-80 190,0 -305,290 C -100,140 0,0 40,-80 z',
                    'close': null,
                    'path' : 'm 75,-80 155,0 0,225 C 90,85 100,30 75,-80 z'
                },
                'frame' : {
                    'open' : 'M 0,0 0,60 80,60 80,0 Z M 40,30 40,30 40,30 40,30 Z',
                    'close': null,
                    'path' : 'M 0,0 0,60 80,60 80,0 Z M 80,0 80,60 0,60 0,0 Z'
                },
                'origami' : {
                    'open' : 'm -10,-10 0,80 100,0 0,-80 z m 50,-30.5 0,70.5 0,70 0,-70 z',
                    'close': null,
                    'path' : 'm -10,-10 0,80 100,0 0,-80 z M 40,-40.5 120,30 40,100 -40,30 z'
                },
                'parallelogram' : {
                    'open' : 'M 0,0 0,60 80,60 80,0 z M 80,0 40,30 0,60 40,30 z',
                    'close' : null,
                    'path' : 'M 0,0 0,60 80,60 80,0 Z M 80,0 80,60 0,60 0,0 Z'
                },
                'spill' : {
                    'open' : 'M 0,0 c 0,0 63.5,-16.5 80,0 16.5,16.5 0,60 0,60 L 0,60 Z',
                    'close': null,
                    'path' : 'M 0,0 c 0,0 -16.5,43.5 0,60 16.5,16.5 80,0 80,0 L 0,60 Z'
                },
                'swipe' : {
                    'open' : 'M 40,-65 145,80 -65,80 40,-65',
                    'close': 'm 40,-65 0,0 L -65,80 40,-65',
                    'path' : 'M 40,-65 145,80 40,-65'
                },
                'tilted' : {
                    'open' : 'M 0,0 80,-10 80,60 0,70 0,0',
                    'close': 'M 0,-10 80,-20 80,-10 0,0 0,-10',
                    'path' : 'M 0,70 80,60 80,80 0,80 0,70'
                },
                'tunnel' : {
                    'open' : 'M -18 -26.90625 L -18 86.90625 L 98 86.90625 L 98 -26.90625 L -18 -26.90625 Z M 40 29.96875 C 40.01804 29.96875 40.03125 29.98196 40.03125 30 C 40.03125 30.01804 40.01804 30.03125 40 30.03125 C 39.98196 30.03125 39.96875 30.01804 39.96875 30 C 39.96875 29.98196 39.98196 29.96875 40 29.96875 Z',
                    'close': null,
                    'path' : 'M -18 -26.90625 L -18 86.90625 L 98 86.90625 L 98 -26.90625 L -18 -26.90625 Z M 40 -25.6875 C 70.750092 -25.6875 95.6875 -0.7500919 95.6875 30 C 95.6875 60.750092 70.750092 85.6875 40 85.6875 C 9.2499078 85.6875 -15.6875 60.750092 -15.6875 30 C -15.6875 -0.7500919 9.2499078 -25.6875 40 -25.6875 Z'
                },
                'wave' : {
                    'open' : 'm -5,-5 0,70 90,0 0,-70 z m 5,35 c 0,0 15,20 40,0 25,-20 40,0 40,0 l 0,0 C 80,30 65,10 40,30 15,50 0,30 0,30 z',
                    'close': null,
                    'path' : 'm -5,-5 0,70 90,0 0,-70 z m 5,5 c 0,0 7.9843788,0 40,0 35,0 40,0 40,0 l 0,60 c 0,0 -3.944487,0 -40,0 -30,0 -40,0 -40,0 z'
                },
                'windscreen' : {
                    'open' : 'M 40,100 150,0 -65,0 z',
                    'close': null,
                    'path' : 'M 40,100 150,0 l 0,0 z'
                }
            };
            attrs.startEvent = attrs.startEvent && attrs.startEvent.length>0 ? attrs.startEvent : "anim-transition-start";
            attrs.stopEvent  = attrs.stopEvent && attrs.stopEvent.length>0 ? attrs.stopEvent : "anim-transition-stop";

            attrs.animTransitionType = attrs.animTransitionType && attrs.animTransitionType.length>0 ? attrs.animTransitionType : 'parallelogram';
            var animation = config[attrs.animTransitionType] ? config[attrs.animTransitionType] : config['parallelogram'];
            
            var div = element[0].querySelector('.pageload-overlay');
            if(animation.open){
                div.setAttribute("data-opening", animation.open);
            }
            if(animation.close){
                div.setAttribute("data-closing", animation.close);
            }
            var svg = element.find('svg')[0];
            var path = document.createElementNS("http://www.w3.org/2000/svg", 'path');
            if(animation.path){
                path.setAttribute("d", animation.path);
            }
            svg.appendChild(path);
            
            return function link(scope, element) {
                var overlay = element[0].querySelector('.pageload-overlay');
                scope.svgLoader = new SVGLoader( overlay, { speedIn : 300, speedOut : 600, easingIn : mina.easeinout, easingOut : mina.bounce });
                    scope.$on("$destroy", function () {
                    console.log('anim-transition-destroy event');
                });
            };
        }
    };

});
