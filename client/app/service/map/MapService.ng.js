angular.module("entraide").factory("MapService", function($rootScope){

    var mapStyles =  [{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#e0efef"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"hue":"#1900ff"},{"color":"#c0e8e8"}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":100},{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"visibility":"on"},{"lightness":700}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#7dcdcd"}]}];
    var mapOptions = {
        styles: mapStyles,
        streetViewControl: false,
        draggable: false,
        minZoom: 10,
        mapTypeControlOptions: {
            mapTypeIds: ['roadmap']
        },
        zoomControlOptions: {
            position: 12
        },
        panControl: false
    };

    var map = {
        center: {
            "latitude":46.08085173686787,"longitude":6.3995361328125
        },
        zoom: 8,
        events: {
            click: function (mapModel, eventName, originalEventArgs) {
                $rootScope.$broadcast('map-click', originalEventArgs);
            }
        },
        marker: {
            options: { draggable: true },
            events: {
                dragend: function (marker) {
                    /*if (!$scope.event.location)
                        $scope.event.location = {};

                    $scope.event.location.latitude = marker.getPosition().lat();
                    $scope.event.location.longitude = marker.getPosition().lng();*/
                }
            }
        },
        options: mapOptions
    };

    var mapService = {
        getMap : function(location){
            map.center = location ? location : map.center;
            return map;
        },
        getCoord : function(originalEventArgs) {
            var location = {
                latitude : originalEventArgs[0].latLng.lat(),
                longitude : originalEventArgs[0].latLng.lng()
            };
            console.log(JSON.stringify(location));
            return location;
        }

    };

    return mapService;
});
