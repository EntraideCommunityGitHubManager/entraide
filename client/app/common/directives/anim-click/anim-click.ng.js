angular.module('entraide').directive('animClick', function(UtilsService){

    return {
        restrict: 'AEC',
        replace: true,
        transclude: true,
        scope: {
            animClickCallback: '&'
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
            };
            
            var cbutton = element[0].querySelector('.cbutton');
            
            scope.clickHandler = function(){
                 classie.add( cbutton, 'cbutton--click' );
                    onEndAnimation( classie.has( cbutton, 'cbutton--complex' ) ? cbutton.querySelector( '.cbutton__helper' ) : cbutton, function() {
                        classie.remove( cbutton, 'cbutton--click' );
                        scope.animClickCallback();
                    });
            }
            
            eventtype = UtilsService.isMobile() ? 'touchstart' : 'click';
            
            
            /*cbutton.addEventListener( eventtype, function( ev ) {
                    classie.add( cbutton, 'cbutton--click' );
                    onEndAnimation( classie.has( cbutton, 'cbutton--complex' ) ? cbutton.querySelector( '.cbutton__helper' ) : cbutton, function() {
                        //classie.remove( cbutton, 'cbutton--click' );
                    });
                });*/

            /*[].slice.call( document.querySelectorAll( '.cbutton' ) ).forEach( function( el ) {
                el.addEventListener( eventtype, function( ev ) {
                    classie.add( el, 'cbutton--click' );
                    onEndAnimation( classie.has( el, 'cbutton--complex' ) ? el.querySelector( '.cbutton__helper' ) : el, function() {
                        //classie.remove( el, 'cbutton--click' );
                    });
                });
            });*/

            scope.$on("$destroy", function () {});
        }
    };

});
