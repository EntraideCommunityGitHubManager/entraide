angular.module('entraide').directive('animLogin', function(){

    return {
        restrict: 'AEC',
        scope: {
            model: '=',
            titleLogin: '@',
            titleCreate: '@',
            error: '=',
            isConnected: '=',
            loginCallback: '&',
            createCallback: '&',
            editCallback: '&',
            logoutCallback: '&',
            animLoginToggleEvent: '@'
        },
        templateUrl: 'client/app/directives/anim-login/anim-login.ng.html',
        controller: function($scope){
            $scope.login = function(){
                $scope.loginCallback();
            };
            $scope.create = function(){
                $scope.createCallback();
            };
            $scope.edit = function(){
                $scope.editCallback();
            };
            $scope.logout = function(){
                $scope.logoutCallback();
            };
            $scope.$on($scope.animLoginToggleEvent, function(){
                $scope.uIMorphingButton.toggle();
            });
        },
        link: function (scope, element) {

            var docElem = window.document.documentElement, didScroll, scrollPosition;
            function noScrollFn() {window.scrollTo( scrollPosition ? scrollPosition.x : 0, scrollPosition ? scrollPosition.y : 0 );}
            function noScroll() {
                window.removeEventListener( 'scroll', scrollHandler );
                window.addEventListener( 'scroll', noScrollFn );
            }
            function scrollFn() {window.addEventListener( 'scroll', scrollHandler );}
            function canScroll() {
                window.removeEventListener( 'scroll', noScrollFn );
                scrollFn();
            }
            function scrollHandler() {
                if( !didScroll ) {
                    didScroll = true;
                    setTimeout( function() { scrollPage(); }, 60 );
                }
            };
            function scrollPage() {
                scrollPosition = { x : window.pageXOffset || docElem.scrollLeft, y : window.pageYOffset || docElem.scrollTop };
                didScroll = false;
            };
            scrollFn();

            scope.uIMorphingButton = new UIMorphingButton($('.morph-button')[0], {
                closeEl : '.icon-close',
                onBeforeOpen : function() {noScroll();},
                onAfterOpen  : function() {canScroll();},
                onBeforeClose: function() {noScroll();},
                onAfterClose : function() {canScroll();}
            });

            scope.$on("$destroy", function () {});
        }
    };

});
