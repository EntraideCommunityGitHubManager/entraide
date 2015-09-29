angular.module('entraide').controller('SearchEventsListCtrl', function ($scope, $meteor) {

    console.log("main events search Ctrl");

    $scope.loading = true;
    $meteor.subscribe('search-events', {region:{id:1}} ).then(function(subscriptionHandler){
        $scope.events = $meteor.collection(Events)
        $scope.loading = false;
    });



});

