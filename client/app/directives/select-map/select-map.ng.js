angular.module('entraide').directive('selectMap', function($rootScope, $state, SessionService){

    return {
        restrict: 'AEC',
        scope: {

        },
        templateUrl: 'client/app/directives/select-map/select-map.ng.html',
        controller: function($scope){
            $scope.title = 'Select a department ';
            $scope.goTo = function(code) {
                SessionService.setDepartmentByCode(code).then(function(){
                    $rootScope.$broadcast('anim-transition-start');
                    setTimeout( function() {
                        $rootScope.$broadcast('anim-background-stop');
                        $state.go("app.main.events.search.byProfile");
                    }, 1000 );
                });
            }
        },
        link: function (scope, element) {
            $('.france-map').vectorMap({
                map: 'france_department_2015',
                hoverOpacity: 0.5,
                hoverColor: "#EC0000",
                backgroundColor: "transparent",
                color: "rgba(86, 139, 148, 0.85)",
                borderColor: "black",
                selectedColor: "rgb(53, 80, 84)",
                enableZoom: false,
                showTooltip: true,
                onMapElementClick: function(element, code, name) {
                    scope.goTo(code);
                }
            });

            scope.$on("$destroy", function () {
                $('.france-map').off();
                $('.jqvmap-label').remove();
            });


        }
    };

});