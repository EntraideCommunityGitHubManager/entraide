angular.module('entraide').controller('SearchEventsListCtrl', function ($scope, $meteor, SessionService, CollectionService) {

    $scope.regionId = SessionService.getUserProfile().regionId;

    $scope.event = {};


    $scope.loading = true;
    var options = {collectionOptions:{'region.id':SessionService.getUserProfile().regionId}, backend:true};
    CollectionService.subscribe('search-events', options).then(function(events) {
        $scope.events = events;



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
            }
        };

        $scope.loading = false;
    });

});

