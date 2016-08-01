angular.module('entraide').directive('animBackground', function(AnimBackgroundService){

    return {
        restrict: 'AEC',
        scope: {
            startEvent: '@',
            stopEvent : '@',
            videoId: '@',
            sourceVideo : '@',
            sourceImage : '@'
        },
        templateUrl: 'client/app/common/directives/anim-background/anim-background.ng.html',
        compile: function(element, attrs) {
            attrs.startEvent = attrs.startEvent && attrs.startEvent.length>0 ? attrs.startEvent : "anim-background-start";
            attrs.stopEvent  = attrs.stopEvent && attrs.stopEvent.length>0 ? attrs.stopEvent : "anim-background-stop";

            return function link(scope) {
                scope.isTouch = Modernizr.touch;

                scope.$on(scope.startEvent, function(){play();});
                scope.$on(scope.stopEvent, function(){stop();});
                scope.$on("$destroy", function(){stop()});

                function play(){ if (!scope.isTouch) AnimBackgroundService.playVideo(scope.videoId, scope.sourceVideo, scope.isTouch); }
                function stop(){ if (!scope.isTouch) AnimBackgroundService.stopVideo(scope.videoId); }

                play();

            };
        }
    };

});