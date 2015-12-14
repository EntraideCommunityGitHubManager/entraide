angular.module('entraide').directive('animClick', function(UtilsService){

    return {
        restrict: 'AEC',
        transclude: true,
        scope: {
            animClickHandler: '&'
        },
        templateUrl: 'client/app/common/directives/anim-click/anim-click.ng.html',
        controller: function($scope){
            
        },
        link: function (scope, element) {
            
            var support = { animations : Modernizr.cssanimations };
            var animEndEventNames = { 'WebkitAnimation' : 'webkitAnimationEnd', 'OAnimation' : 'oAnimationEnd', 'msAnimation' : 'MSAnimationEnd', 'animation' : 'animationend' };
            var animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ];
            var onEndAnimation = function( el, callback ) {
                var onEndCallbackFn = function( ev ) {
                    if( support.animations ) {
                        if( ev.target != this ) return;
                        this.removeEventListener( animEndEventName, onEndCallbackFn );
                    }
                    if( callback && typeof callback === 'function' ) { callback.call(); }
                };
                if( support.animations ) {
                    el.addEventListener( animEndEventName, onEndCallbackFn );
                } else {
                    onEndCallbackFn();
                }
            },
            eventtype = UtilsService.isMobile() ? 'touchstart' : 'click';

            [].slice.call( document.querySelectorAll( '.cbutton' ) ).forEach( function( el ) {
                el.addEventListener( eventtype, function( ev ) {
                    classie.add( el, 'cbutton--click' );
                    onEndAnimation( classie.has( el, 'cbutton--complex' ) ? el.querySelector( '.cbutton__helper' ) : el, function() {
                        //classie.remove( el, 'cbutton--click' );
                    });
                });
            });

            scope.$on("$destroy", function () {});
        }
    };

});
