angular.module('entraide').directive('animToaster', function(AnimToasterNotificationService){

    return {
        restrict: 'AEC',
        replace: true,
        templateUrl: 'client/app/common/directives/anim-toaster/anim-toaster.ng.html',
        controller: function($scope){
           $scope.service = AnimToasterNotificationService;
           angular.$watch('service.infoMessage', refresh());
           angular.$watch('service.successMessage', refresh());
           angular.$watch('service.warningMessage', refresh());
           angular.$watch('service.errorMessage', refresh());
           function refresh(){
               console.log('AnimToaster.$scope.$digest');
               $scope.$digest();
           }
        },
        link: function (scope, element) {
            scope.$on("$destroy", function () {});
        }
    };

});
