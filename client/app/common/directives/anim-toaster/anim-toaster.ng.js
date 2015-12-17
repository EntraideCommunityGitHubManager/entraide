angular.module('entraide').directive('animToaster', function(AnimToasterNotificationService){

    return {
        restrict: 'AEC',
        replace: true,
        templateUrl: 'client/app/common/directives/anim-toaster/anim-toaster.ng.html',
        controller: function($scope){
           $scope.notifService = AnimToasterNotificationService;
        },
        link: function (scope, element) {
            scope.$on("$destroy", function () {});
        }
    };

});
