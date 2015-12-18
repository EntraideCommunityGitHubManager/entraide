angular.module('entraide').directive('animClick', function($timeout){

    return {
        restrict: 'AEC',
        replace: true,
        transclude: true,
        scope: {
            animClickIcon: '@',
            animClickType: '@',
            animClickCallback: '&'
        },
        templateUrl: 'client/app/common/directives/anim-click/anim-click.ng.html',
        controller: function($scope){

        },
        link: function (scope, element) {
            scope.animClickIcon = scope.animClickIcon ? scope.animClickIcon : 'fa-circle-o-notch';
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
                classie.add( cbutton, 'cbutton-click' );
                $timeout(function(){
                    onEndAnimation( classie.has( cbutton, 'cbutton-complex' ) ? cbutton.querySelector( '.cbutton__helper' ) : cbutton, function() {
                        classie.remove( cbutton, 'cbutton-click' );
                        scope.animClickCallback();
                    });
                },300);
            };

            scope.$on("$destroy", function () {});
        }
    };

});
