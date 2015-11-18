angular.module('entraide').directive('animBackground', function(){

    return {
        restrict: 'AEC',
        scope: {
            startEvent: '@',
            stopEvent : '@',
            sourceVideo : '@',
            sourceImage : '@'
        },
        templateUrl: 'client/app/directives/anim-background/anim-background.ng.html',
        controller: function ($scope) {
            $scope.BV = null;
        },
        compile: function(element, attrs) {

            attrs.startEvent = attrs.startEvent && attrs.startEvent.length>0 ? attrs.startEvent : "anim-background-start";
            attrs.stopEvent  = attrs.stopEvent && attrs.stopEvent.length>0 ? attrs.stopEvent : "anim-background-stop";

            return function link(scope, element) {
                scope.isTouch = Modernizr.touch;
                if (!scope.isTouch) {
                    scope.bigImage = $('.big-image');
                    scope.bigImage = $(element.find('img')[0]);
                    scope.BV = new $.BigVideo({forceAutoplay:scope.isTouch});
                    scope.BV.init();
                    scope.BV.getPlayer().addEvent('loadeddata', function() {scope.bigImage.transit({'opacity':0},500);});
                    scope.bigImage.css('position','relative').imagesLoaded(adjustImagePositioning);
                    $(window).on('resize', adjustImagePositioning);
                    scope.BV.show(scope.sourceVideo,{ambient:true});
                }

                scope.$on(scope.startEvent, function(){});
                scope.$on(scope.stopEvent, function(){});
                scope.$on("$destroy", function () {});

                function adjustImagePositioning() {
                    scope.bigImage.each(function(){
                        var $img = $(this),
                            img = new Image();

                        img.src = $img.attr('src');

                        var windowWidth = $(window).width(),
                            windowHeight = $(window).height(),
                            r_w = windowHeight / windowWidth,
                            i_w = img.width,
                            i_h = img.height,
                            r_i = i_h / i_w,
                            new_w, new_h, new_left, new_top;

                        if( r_w > r_i ) {
                            new_h   = windowHeight;
                            new_w   = windowHeight / r_i;
                        }
                        else {
                            new_h   = windowWidth * r_i;
                            new_w   = windowWidth;
                        }

                        $img.css({
                            width   : new_w,
                            height  : new_h,
                            left    : ( windowWidth - new_w ) / 2,
                            top     : ( windowHeight - new_h ) / 2
                        })

                    });

                }


            };
        }
    };

});