angular.module('entraide').directive('animTransition', function($window){

    function extend( a, b ) {
        for( var key in b ) {
            if( b.hasOwnProperty( key ) ) {
                a[key] = b[key];
            }
        }
        return a;
    }

    function SVGLoader( el, options ) {
        this.el = el;
        this.options = extend( {}, this.options );
        extend( this.options, options );
        this._init();
    }

    SVGLoader.prototype.options = {
        speedIn : 500,
        easingIn : mina.linear
    }

    SVGLoader.prototype._init = function() {
        var s = Snap( this.el.querySelector( 'svg' ) );
        this.path = s.select( 'path' );
        this.initialPath = this.path.attr('d');

        var openingStepsStr = this.el.getAttribute( 'data-opening' );
        this.openingSteps = openingStepsStr ? openingStepsStr.split(';') : '';
        this.openingStepsTotal = openingStepsStr ? this.openingSteps.length : 0;
        if( this.openingStepsTotal === 0 ) return;

        // if data-closing is not defined then the path will animate to its original shape
        var closingStepsStr = this.el.getAttribute( 'data-closing' ) ? this.el.getAttribute( 'data-closing' ) : this.initialPath;
        this.closingSteps = closingStepsStr ? closingStepsStr.split(';') : '';
        this.closingStepsTotal = closingStepsStr ? this.closingSteps.length : 0;

        this.isAnimating = false;

        if( !this.options.speedOut ) {
            this.options.speedOut = this.options.speedIn;
        }
        if( !this.options.easingOut ) {
            this.options.easingOut = this.options.easingIn;
        }
    }

    SVGLoader.prototype.show = function() {
        if( this.isAnimating ) return false;
        this.isAnimating = true;
        // animate svg
        var self = this,
            onEndAnimation = function() {
                classie.addClass( self.el, 'pageload-loading' );
            };
        this._animateSVG( 'in', onEndAnimation );
        classie.add( this.el, 'show' );
    }

    SVGLoader.prototype.hide = function() {
        var self = this;
        classie.removeClass( this.el, 'pageload-loading' );
        this._animateSVG( 'out', function() {
            // reset path
            self.path.attr( 'd', self.initialPath );
            classie.removeClass( self.el, 'show' );
            self.isAnimating = false;
        } );
    }

    SVGLoader.prototype._animateSVG = function( dir, callback ) {
        var self = this,
            pos = 0,
            steps = dir === 'out' ? this.closingSteps : this.openingSteps,
            stepsTotal = dir === 'out' ? this.closingStepsTotal : this.openingStepsTotal,
            speed = dir === 'out' ? self.options.speedOut : self.options.speedIn,
            easing = dir === 'out' ? self.options.easingOut : self.options.easingIn,
            nextStep = function( pos ) {
                if( pos > stepsTotal - 1 ) {
                    if( callback && typeof callback == 'function' ) {
                        callback();
                    }
                    return;
                }
                self.path.animate( { 'path' : steps[pos] }, speed, easing, function() { nextStep(pos); } );
                pos++;
            };

        nextStep(pos);
    }

    // add to global namespace
    $window.SVGLoader = SVGLoader;

    return {
        restrict: 'AEC',
        transclude: true,
        scope: {
            startEvent: '@',
            stopEvent : '@',
            animationType: '@'
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
            attrs.animationType = attrs.animationType && attrs.animationType.length>0 ? attrs.animationType : 'parallelogram';
            var animation = config[attrs.animationType] ? config[attrs.animationType] : config['parallelogram'];
            
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
