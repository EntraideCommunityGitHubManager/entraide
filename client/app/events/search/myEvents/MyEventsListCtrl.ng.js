angular.module('entraide').controller('MyEventsListCtrl', function ($scope, $meteor) {

    console.log("my events list Ctrl");

    $scope.loading = true;
    $scope.$meteorSubscribe('my-events').then(function(subscriptionHandler){
        $scope.events = $meteor.collection(Events);
        $scope.loading = false;
        subscriptionHandler.stop();
    });

    $scope.remove = function(event){
        $scope.events.remove(event);
    }


});

