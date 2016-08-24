angular.module('entraide').directive('animLogin', function(){

    return {
        restrict: 'AEC',
        replace: true,
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
            animLoginToggleEvent: '@',
            profileImage:'=',
            profileImageDefault:'@'
        },
        templateUrl: 'client/app/common/directives/anim-login/anim-login.ng.html',
        controller: function($scope){
            $scope.frontClass = {transform: 'rotateY(0deg)'};
            $scope.backClass  = {transform: 'rotateY(-180deg)'};
            $scope.frontVisible = true;

            $scope.login = function(){
                $scope.loginCallback();
            };
            $scope.create = function(){
                var regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
                if(regex.test($scope.model.email)){
                    if(!$scope.model.password || !$scope.model.confirmPassword){
                        $scope.error={reason:'Mots de passe recquis.'};
                    } else if($scope.model.password !== $scope.model.confirmPassword){
                        $scope.error={reason:'Les 2 mots de passe ne correspondent pas.'};
                    } else {
                        $scope.createCallback();
                    }
                } else {
                    $scope.error = {reason:'Veuillez renseigner un email valide'};
                }
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
            $scope.initState = function(){
                $scope.uIMorphingButton.expanded = false;
                $scope.uIMorphingButton.isAnimating = false;
            };
            $scope.swap = function(){
                $scope.error = {reason:''};
                $scope.frontVisible = !$scope.frontVisible;
                if($scope.frontVisible){
                    $scope.frontClass = {transform: 'rotateY(0deg)'};
                    $scope.backClass  = {transform: 'rotateY(-180deg)'};
                } else {
                    $scope.frontClass = {transform: 'rotateY(180deg)'};
                    $scope.backClass  = {transform: 'rotateY(0deg)'};
                }

            };
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
                onBeforeOpen : function() {
                    noScroll();
                    $timeout(function(){
                        scope.frontClass = {transform: 'rotateY(0deg)'};
                        scope.backClass  = {transform: 'rotateY(-180deg)'};
                        scope.frontVisible = true;
                    });
                },
                onAfterOpen  : function() {
                    canScroll();
                    element.find('#email')[0].focus();
                    element.find('.back').css('display','block');
                },
                onBeforeClose: function() {
                    noScroll();
                    element.find('.back').css('display','none');
                },
                onAfterClose : function() {
                    canScroll();
                    $timeout(function(){
                        scope.error = {reason:''};
                        scope.frontClass = {transform: 'rotateY(0deg)'};
                        scope.backClass  = {transform: 'rotateY(-180deg)'};
                        scope.frontVisible = true;
                    });
                    element.find('.back').css('display','none');
                }
            });

            $(".navbar-collapse a:not('.dropdown-toggle')").click(function(){
                if($(".navbar-toggle").css('display')!='none'){
                    $(".navbar-toggle").click();
                }
            });

            scope.$on("$destroy", function () {});
        }
    };

});
