angular.module('entraide').directive('selectMap', function(){

    return {
        restrict: 'AEC',
        scope: {
            goTo: '&'
        },
        templateUrl: 'client/app/directives/select-map/select-map.ng.html',
        link: function (scope) {
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
                onMapElementClick: function(element, code) {
                    scope.goTo()(code);
                }
            });

            scope.$on("$destroy", function () {
                $('.france-map').off();
                $('.jqvmap-label').remove();
            });


        }
    };

});