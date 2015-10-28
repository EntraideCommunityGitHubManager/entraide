angular.module('entraide').controller('SearchEventsListCtrl', function ($scope, $meteor, SessionService, CollectionService) {

    $scope.region = SessionService.getUserProfile().region;

    $scope.event = {};


    $scope.loading = true;
    var options = {collectionOptions:{'region.code':SessionService.getUserProfile().region.code}, backend:true};
    CollectionService.subscribe('search-events', options).then(function(events) {
        $scope.events = events;


        var mapStyles =  [{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#e0efef"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"hue":"#1900ff"},{"color":"#c0e8e8"}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":100},{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"visibility":"on"},{"lightness":700}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#7dcdcd"}]}];
        var mapOptions = {
            styles: mapStyles,
            streetViewControl: false,
            draggable: false,
            minZoom: 8,
            mapTypeControlOptions: {
                mapTypeIds: ['roadmap']
            },
            zoomControlOptions: {
                //position: 12
            },
            panControl: false
        };

        $scope.map = {
            center: {
                latitude: 45.9,
                longitude: 6.57239
            },
            zoom: 8,
            events: {
                click: function (mapModel, eventName, originalEventArgs) {
                    if (!$scope.event)
                        return;

                    if (!$scope.event.location)
                        $scope.event.location = {};

                    $scope.event.location.latitude = originalEventArgs[0].latLng.lat();
                    $scope.event.location.longitude = originalEventArgs[0].latLng.lng();

                    console.log(JSON.stringify($scope.event));

                    $scope.$apply();
                }
            },
            marker: {
                options: { draggable: true },
                events: {
                    dragend: function (marker, eventName, args) {
                        if (!$scope.event.location)
                            $scope.event.location = {};

                        $scope.event.location.latitude = marker.getPosition().lat();
                        $scope.event.location.longitude = marker.getPosition().lng();
                    }
                }
            },
            options: mapOptions
        };

        $scope.loading = false;
    });

});

