angular.module('entraide').directive('animSidebar', function(UtilsService){

    return {
        restrict: 'AEC',
        transclude: true,
        templateUrl: 'client/app/common/directives/anim-sidebar/anim-sidebar.ng.html',
        scope : {
            type: '@',
            targetView: '@',
            pusher: '@'
        },
        controller: function($scope){
            console.log('animSideBar controller');
            $scope.container = 'st-container';
            var container = document.getElementById($scope.container);
            var resetMenu = function() {classie.remove( container, 'st-menu-open' );};

            var hasThisParent = function( e, id ) {
                if (!e) return false;
                var el = e.target||e.srcElement||e||false;
                while (el && el.id != id) {
                    el = el.parentNode||false;
                }
                return (el!==false);
            }

            /*document.addEventListener('click', function( ev ) {
                if( $scope.menuOpen && hasThisParent( ev.target, 'st-container') ) {
                    resetMenu();
                    $scope.menuOpen = false;
                }
            });*/

            var animSideBarListener = $scope.$on('anim-sidebar-toggle', function(event) {
                event.preventDefault();
                var eventType = UtilsService.isMobile() ? 'touchstart' : 'click';
                if($scope.menuOpen){
                    resetMenu();
                    $scope.menuOpen = false;
                } else {
                    container.className = $scope.container;
                    classie.add( container, 'st-effect-'+$scope.type );
                    setTimeout( function() {
                        classie.add( container, 'st-menu-open' );
                        $scope.menuOpen = true;
                    }, 25 );
                }
            });

            $scope.$on("$destroy", animSideBarListener);

            $scope.insidePusher = function(type){return _.contains(['3','6','7','8','14'], type);};
        },
        link: function (scope, element) {

        }
    };

});