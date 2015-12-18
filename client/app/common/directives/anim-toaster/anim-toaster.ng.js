angular.module('entraide').directive('animToaster', function(AnimToasterNotificationService){

    return {
        restrict: 'AEC',
        replace: true,
        templateUrl: 'client/app/common/directives/anim-toaster/anim-toaster.ng.html',
        controller: function($scope){
           $scope.service = AnimToasterNotificationService;
        },
        link: function (scope, element) {
            angular.$watch('service.infoMessage', refresh());
            angular.$watch('service.successMessage', refresh());
            angular.$watch('service.warningMessage', refresh());
            angular.$watch('service.errorMessage', refresh());
            function refresh(){setTimeout(function(){scope.$digest();},100);}
            scope.$on("$destroy", function () {});
        }
    };

});
