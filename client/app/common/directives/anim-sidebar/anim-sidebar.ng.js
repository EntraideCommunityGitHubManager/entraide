angular.module('entraide').directive('animSidebar', function(UtilsService, AnimSidebarService, $rootScope){

    return {
        restrict: 'AEC',
        transclude: true,
        templateUrl: 'client/app/common/directives/anim-sidebar/anim-sidebar.ng.html',
        scope : {
            type: '@',
            targetView: '@',
            pusher: '@',
            preventClasses: '@'
        },
        controller: function($scope){
            console.log('animSideBar controller');
            $scope.container = 'st-container';
            var container = document.getElementById($scope.container);
            var resetMenu = function() {classie.remove( container, 'st-menu-open' );};

            var preventClasses = $scope.preventClasses.split(",");
            preventClasses.push('st-menu');
            document.addEventListener('click', function( ev ) {
                if( AnimSidebarService.open && !UtilsService.navigatorUtils.hasThisParent( ev.target, preventClasses) ) {
                    console.log('animSideBar click outside close');
                    resetMenu();
                    AnimSidebarService.open = false;
                    $rootScope.$broadcast('anim-side-bar-close');
                }
            });

            var animSideBarListener = $scope.$on('anim-sidebar-toggle', function(event) {
                event.preventDefault();
                var eventType = UtilsService.navigatorUtils.isMobile() ? 'touchstart' : 'click';
                if(AnimSidebarService.open){
                    resetMenu();
                    AnimSidebarService.open = false;
                } else {
                    container.className = $scope.container;
                    classie.add( container, 'st-effect-'+$scope.type );
                    setTimeout( function() {
                        classie.add( container, 'st-menu-open' );
                        AnimSidebarService.open = true;
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

angular.module("entraide").factory("AnimSidebarService", function(){

    var AnimSidebarService = {
        open: false
    };

    return AnimSidebarService;
});
