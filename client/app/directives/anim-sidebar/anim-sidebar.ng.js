angular.module('entraide').directive('animSidebar', function(UtilsService){

    return {
        restrict: 'AEC',
        transclude: true,
        templateUrl: 'client/app/directives/anim-sidebar/anim-sidebar.ng.html',
        scope : {
            type: '@',
            targetView: '@'
        },
        controller: function($scope){
            console.log('animSideBar controller');
            $scope.container = 'st-container';
            var animSideBarListener = $scope.$on('anim-sidebar-on', function(event){
                event.preventDefault();
                var container = document.getElementById($scope.container);
                var eventtype = UtilsService.isMobile() ? 'touchstart' : 'click';
                var resetMenu = function() {
                    classie.remove( container, 'st-menu-open' );
                };
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

            $scope.insidePusher = function(type){
                return _.contains(['3','6','7','8','14'], type);
            }
        },
        link: function (scope, element) {

        }
    };

});