angular.module('entraide').directive('selectMap', function($state, SessionService){

    return {
        restrict: 'AEC',
        scope: {

        },
        templateUrl: 'client/app/directives/select-map/select-map.ng.html',
        controller: function($scope){
            $scope.title = 'Select a region ';
            $scope.goTo = function(regionId) {
                SessionService.getUserProfile().regionId = regionId;
                $state.go("app.main.events.search.byProfile");
            }
        },
        link: function (scope, element) {
            $('.france-region-map').vectorMap({
                map: 'france_fr',
                hoverOpacity: 0.5,
                hoverColor: "#EC0000",
                backgroundColor: "#696764",
                color: "rgba(86, 139, 148, 0.85)",
                borderColor: "#000000",
                selectedColor: "rgb(53, 80, 84)",
                enableZoom: false,
                showTooltip: true,
                onRegionClick: function(element, regionId, regionName) {
                    scope.goTo(regionId);
                }
            });

            scope.$on("$destroy", function () {
                $('.france-region-map').off();
                $('.jqvmap-label').remove();
            });


        }
    };

});