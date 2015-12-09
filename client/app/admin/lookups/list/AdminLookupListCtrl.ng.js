angular.module('entraide').controller('AdminLookupListCtrl', function ($scope, $meteor, CollectionService) {

    CollectionService.subscribe('all-departments').then(function(departments) {
        $scope.departments = departments;
    });

    CollectionService.subscribe('all-categories').then(function(categories) {
        $scope.categories = categories;
    });

    $scope.removeCategory = function(category){
        $scope.categories.remove(category);
    };

    $scope.removeDepartment = function(department){
        $scope.departments.remove(department);
    };


});

