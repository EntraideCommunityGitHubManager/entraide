angular.module('entraide').controller('AdminLookupListCtrl', function ($scope, $meteor, CollectionService, AnimToasterNotificationService) {

    CollectionService.subscribe('all-departments').then(function(departments) {
        $scope.departments = departments;
    });

    CollectionService.subscribe('all-categories').then(function(categories) {
        $scope.categories = categories;
    });

    $scope.removeCategory = function(category){
        $scope.categories.remove(category).then(function(){
            AnimToasterNotificationService.addSuccessMessage("The category has been successfully deleted.");
        },function(error){
            AnimToasterNotificationService.addErrorMessage("Error : " + error.reason);
        });
    };

    $scope.removeDepartment = function(department){
        $scope.departments.remove(department).then(function(){
            AnimToasterNotificationService.addSuccessMessage("The department has been successfully deleted.");
        },function(error){
            AnimToasterNotificationService.addErrorMessage("Error : " + error.reason);
        });
    };


});

